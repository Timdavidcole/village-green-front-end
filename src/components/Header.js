import { Link } from "react-router-dom";
import React from "react";
import LoggedInView from "./LoggedInView";
import SignInHeader from "./SignInHeader";
import { connect } from "react-redux";
import "../styles/header.css";

const mapStateToProps = (state) => ({
  windowDims: state.notices.windowDims,
  resize: state.notices.resize
});

const mapDispatchToProps = (dispatch) => ({
  addWindowDims: (payload) =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload }),
});

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="header-items-right">
        <Link
          to="/"
          className="header-link"
          style={{
            fontFamily: "titillium web, sans-serif",
            fontSize: "1.2 rem",
          }}
        >
          <i
            style={{ position: "relative", top: "2px" }}
            className="fas fa-globe"
          ></i>
          <span> </span>noticeboard
        </Link>

        <Link to="/register" className="header-link">
          sign up
        </Link>

        <SignInHeader />
      </ul>
    );
  }
  return null;
};

class Header extends React.Component {
  addNewWindowDims(props) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    if (
      this.props.resize ||
      this.props.windowDims.height !== windowHeight ||
      this.props.windowDims.width !== windowWidth
    ) {
      this.props.addWindowDims({
        width: windowWidth,
        height: windowHeight,
      });
    }
  }
  render() {
    return (
      <menu className="header-bar" onLoad={this.addNewWindowDims()}>
        <Link to="/" className="logo">
          {this.props.appName.toLowerCase()}
        </Link>
        {window.innerWidth > 1150 ? (
          <Link to="/" className="tag-line">
            the noticeboard for anyone, anywhere and anything...
          </Link>
        ) : null}
        <LoggedOutView currentUser={this.props.currentUser} />
        <LoggedInView
          onClickLogout={this.props.onClickLogout}
          currentUser={this.props.currentUser}
        />
      </menu>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
