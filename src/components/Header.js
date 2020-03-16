import { Link } from "react-router-dom";
import React from "react";
import LoggedInView from "./LoggedInView";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  noticesWindowDims: state.notices.noticesWindowDims
});

const mapDispatchToProps = dispatch => ({});

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div>
          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>
          {this.props.noticesWindowDims.width > 1095 ? (
            <Link
              to="/"
              style={{
                position: "relative",
                top: "6px",
                fontSize: "18px",
                fontStyle: "italic"
              }}
            >
              the noticeboard for anyone, anywhere and anything...
            </Link>
          ) : null}
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView
            onClickLogout={this.props.onClickLogout}
            currentUser={this.props.currentUser}
          />
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
