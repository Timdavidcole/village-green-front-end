import Header from "./Header";
import React from "react";
import { connect } from "react-redux";
import agent from "../agent";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: "APP_LOAD", payload, token }),
  onRedirect: () => dispatch({ type: "REDIRECT" })
});

class App extends React.Component {
  componentWillMount() {
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
  render() {

    return (
      <div>
        <Header
          currentUser={this.props.currentUser}
          appName={this.props.appName}
        />
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
