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
  onClick: () => dispatch({ type: "DISPLAY_NEW_NOTICE" }),
  onClickLogout: () => dispatch({ type: "LOGOUT"})
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
          <Link onClick={this.props.onClick} to="/" className="header-link">
            {this.props.noticesWindowDims.width > 640 ? " New Notice" : null}
          </Link>
        );
      } else
        return (
          <a onClick={this.props.onClick} className="header-link">
            {this.props.noticesWindowDims.width > 640 ? " New Notice" : null}
          </a>
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
        <ul className="header-items-right">
          <Link to="/" className="header-link">
            Home
          </Link>

          {newNoticeMenu()}

          <Transition in={this.props.pinnedEvent} timeout={duration}>
            {state => (
              <Link
                to={`/@${this.props.currentUser.username}/pinned`}
                className="header-link"
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                {this.props.noticesWindowDims.width > 640
                  ? "Pinned Notices"
                  : null}
              </Link>
            )}
          </Transition>

          <Link to="/settings" className="header-link">
            {this.props.noticesWindowDims.width > 640 ? " Settings" : null}
          </Link>

          <a
            onClick={this.props.onClickLogout}
            className="header-link"
            style={{ cursor: "pointer" }}
          >
            Log Out
          </a>

          <Link
            to={`/@${this.props.currentUser.username}`}
            className="header-link"
          >
            {this.props.currentUser.username}
            <img
              alt="User Profile"
              src={this.props.currentUser.image}
              className="user-profile-pic"
            />
          </Link>
        </ul>
      );
    } else return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInView);
