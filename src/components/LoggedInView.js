import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

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
            new notice
          </button>
        );
    };

    if (this.props.currentUser) {
      return (
        <ul className="header-items-right">
          <Link to="/" className="header-link">
            <i className="fas fa-globe"></i>
            <span> </span>noticeboard
          </Link>

          {newNoticeMenu()}

          <Link
            to={`/@${this.props.currentUser.username}/pinned`}
            className="header-link"
          >
            <i className="fas fa-thumbtack"></i>
            <span> </span>
            notices
          </Link>

          <Link to="/settings" className="header-link">
            settings
          </Link>

          <Link
            to={`/@${this.props.currentUser.username}`}
            className="header-link"
            style={{ display: "inline-block" }}
          >
            <span>{this.props.currentUser.username}</span>
            <img
              alt="User Profile"
              src={this.props.currentUser.image}
              className="user-profile-pic"
            />
          </Link>

          <button
            onClick={this.props.onClickLogout}
            className="header-link"
            style={{ cursor: "pointer" }}
          >
            sign out
          </button>
        </ul>
      );
    } else return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInView);
