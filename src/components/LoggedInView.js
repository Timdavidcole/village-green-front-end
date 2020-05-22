import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  pinnedEvent: state.notices.pinnedEvent,
  windowDims: state.notices.windowDims,
});

const mapDispatchToProps = (dispatch) => ({
  pinNotice: (payload) => dispatch({ type: "PIN_NOTICE", payload }),
  onLoad: (payload) => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  updatePinned: (payload) => dispatch({ type: "REMOVE_PINNED", payload }),
  onClick: () => dispatch({ type: "DISPLAY_NEW_NOTICE" }),
  onClickLogout: () => dispatch({ type: "LOGOUT" }),
});

class LoggedInView extends React.Component {
  render() {
    const newNoticeMenu = () => {
      return (
        <button onClick={this.props.onClick} className="header-link">
          <i
            style={{ position: "relative", top: "2px" }}
            class="fas fa-plus"
          ></i>{" "}
          {this.props.windowDims.width > 770 ? (
            <span> notice</span>
          ) : null}
        </button>
      );
    };

    if (this.props.currentUser) {
      return (
        <ul className="header-items-right">
          <Link to="/" className="header-link">
            <i
              style={{ position: "relative", top: "2px" }}
              className="fas fa-globe"
            ></i>
            {this.props.windowDims.width > 770 ? (
              <span> noticeboard</span>
            ) : null}
          </Link>

          {newNoticeMenu()}

          <Link
            to={`/@${this.props.currentUser.username}/pinned`}
            className="header-link"
          >
            <i
              style={{ position: "relative", top: "2px" }}
              className="fas fa-thumbtack"
            ></i>
            {this.props.windowDims.width > 770 ? (
              <span> notices</span>
            ) : null}
          </Link>

          <Link to="/settings" className="header-link">
            <i
              style={{ position: "relative", top: "2px" }}
              class="fas fa-cog"
            ></i>
            {this.props.windowDims.width > 770 ? (
              <span> settings</span>
            ) : null}
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
