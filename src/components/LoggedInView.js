import { Link } from "react-router-dom";
import React from "react";
import MenuIcon from "./MenuIcon";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import "../styles/menuStyles.css";

const mapStateToProps = state => ({
  pinnedEvent: state.notices.pinnedEvent,
  noticesWindowDims: state.notices.noticesWindowDims
});

const mapDispatchToProps = dispatch => ({
  pinNotice: payload => dispatch({ type: "PIN_NOTICE", payload }),
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  updatePinned: payload => dispatch({ type: "REMOVE_PINNED", payload }),
  onClick: () => dispatch({ type: "DISPLAY_NEW_NOTICE" })
});

class LoggedInView extends React.Component {
  render() {
    const duration = {
      appear: 400,
      enter: 400,
      exit: 400
    };

    const defaultStyle = {
      transform: "scale(1)",
      transition: "transform 0.2s ease-in, color 0.2s ease-in"
    };

    const transitionStyles = {
      entering: { transform: "scale(1.15)", color: "#2e962a", fill: "#2e962a" },
      entered: { transform: "scale(1.15)", color: "#2e962a", fill: "#2e962a" },
      exiting: { transform: "scale(1)" },
      exited: { transform: "scale(1)" }
    };

    const newNoticeMenu = () => {
      if (!window.location.href.includes("globalboard")) {
        return (
          <li onClick={this.props.onClick} className="nav-item">
            <Link to="/" className="nav-link">
              <i className="ion-compose"></i>
              {this.props.noticesWindowDims.width > 640 ? " New Notice" : null}
            </Link>
          </li>
        );
      } else
        return (
          <li onClick={this.props.onClick} className="nav-item">
            <Link className="nav-link">
              <i className="ion-compose"></i>{" "}
              {this.props.noticesWindowDims.width > 640 ? " New Notice" : null}
            </Link>
          </li>
        );
    };

    const pinColor = {
      entering: "#2e962a",
      entered: "#2e962a",
      exiting: "#aeaeae",
      exited: "#aeaeae"
    };
    if (this.props.currentUser) {
      return (
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          {newNoticeMenu()}

          <li className="nav-item">
            <Transition in={this.props.pinnedEvent} timeout={duration}>
              {state => (
                <Link
                  to={`/@${this.props.currentUser.username}/pinned`}
                  className="nav-link"
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                >
                  <MenuIcon class={"pinSVGMain"} stroke={pinColor[state]} />
                  {this.props.noticesWindowDims.width > 640
                    ? "Pinned Notices"
                    : null}
                </Link>
              )}
            </Transition>
          </li>

          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <i className="ion-gear-a"></i>
              {this.props.noticesWindowDims.width > 640 ? " Settings" : null}
            </Link>
          </li>

          <li className="nav-item">
            <div
              onClick={this.props.onClickLogout}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Log Out
            </div>
          </li>

          <li className="nav-item">
            <Link
              to={`/@${this.props.currentUser.username}`}
              className="nav-link"
            >
              <img
                alt="User Profile"
                src={this.props.currentUser.image}
                className="user-pic"
              />
              {this.props.currentUser.username}
            </Link>
          </li>
        </ul>
      );
    } else return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInView);
