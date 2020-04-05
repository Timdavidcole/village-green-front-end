import { Link } from "react-router-dom";
import React from "react";
import LoggedInView from "./LoggedInView";
import SignInHeader from "./SignInHeader";
import { connect } from "react-redux";
import "../styles/header.css";

const mapStateToProps = state => ({
  noticesWindowDims: state.notices.noticesWindowDims
});

const mapDispatchToProps = dispatch => ({});

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="header-items-right">
        <Link
          to="/"
          className="header-link"
          style={{
            fontFamily: "titillium web, sans-serif",
            fontSize: "1.2 rem"
          }}
        >
        <i className="fas fa-globe"></i>
        <span> </span>noticeboard
        </Link>

        <SignInHeader/>

        <Link to="/register" className="header-link">
          sign up
        </Link>
      </ul>
    );
  }
  return null;
};

class Header extends React.Component {
  render() {
    return (
      <menu className="header-bar">
        {this.props.noticesWindowDims.width > 900 ? (
          <Link to="/" className="logo">
            {this.props.appName.toLowerCase()}
          </Link>
        ) : null}
        {this.props.noticesWindowDims.width > 1290 ? (
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
