import Header from "./Header";
import React from "react";
import { connect } from "react-redux";
import agent from "../agent";

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
  centerMap: state.map.centerMap,
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: "APP_LOAD", payload, token }),
  onRedirect: () => dispatch({ type: "REDIRECT" }),
  onClickLogout: () => {
    dispatch({ type: "LOGOUT" });
  },
  logOutNotices: () => {
    dispatch({ type: "LOG_OUT_NOTICES" });
  },
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
    logIn: () => dispatch({type: "LOGGED_IN"})
});

class App extends React.Component {
  componentDidMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  logOut() {
    this.props.onClickLogout();
    this.props.logOutNotices();
    this.props.updateUnsortedNotices(
      agent.Notices.all(JSON.stringify(this.props.centerMap))
    );
  }

  render() {
    if (this.props.currentUser && !this.props.loggedIn) {
      this.props.logIn()
    }
    return (
      <div style={{overflow: "hidden"}}>
        <Header
          currentUser={this.props.currentUser}
          appName={this.props.appName}
          onClickLogout={() => this.logOut()}
        />
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
