import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
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
  onClickLogout: () => dispatch({ type: "LOGOUT" })
});

class LoggedInView extends React.Component {
  render() {

    const newNoticeMenu = () => {
      if (!window.location.href.includes("globalboard")) {
        return (
          <Link onClick={this.props.onClick} to="/" className="header-link">
            {this.props.noticesWindowDims.width > 640 ? " New Notice" : null}
          </Link>
        );
      } else
        return (
          <button onClick={this.props.onClick} className="header-link">
            {this.props.noticesWindowDims.width > 640 ? " New Notice" : null}
          </button>
        );
    };

    if (this.props.currentUser) {
      return (
        <ul className="header-items-right">
          <Link to="/" className="header-link">
            Home
          </Link>

          {newNoticeMenu()}

          <Link
            to={`/@${this.props.currentUser.username}/pinned`}
            className="header-link"
          >
            {this.props.noticesWindowDims.width > 640 ? "Pinned Notices" : null}
          </Link>

          <Link to="/settings" className="header-link">
            {this.props.noticesWindowDims.width > 640 ? " Settings" : null}
          </Link>

          <button
            onClick={this.props.onClickLogout}
            className="header-link"
            style={{ cursor: "pointer" }}
          >
            Log Out
          </button>

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
