import { Link } from "react-router-dom";
import React from "react";

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

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <div
            onClick={props.onClickLogout}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Log Out
          </div>
        </li>

        <li className="nav-item">
          <Link to={`/@${props.currentUser.username}`} className="nav-link">
            <img
              alt="User Profile"
              src={props.currentUser.image}
              className="user-pic"
            />
            {props.currentUser.username}
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
        <div >
          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>
          <Link to="/" style={{position: "relative", top: "6px", fontSize: "18px", fontStyle: "italic"}}>
            the noticeboard for anywhere, anything and anyone...
          </Link>
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

export default Header;
