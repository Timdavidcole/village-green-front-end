import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: "LOGIN", payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: "LOGIN_PAGE_UNLOADED" })
});

class NewNotice extends React.Component {
  constructor() {
    super();
    this.changeEmail = event => this.props.onChangeEmail(event.target.value);
    this.changePassword = event =>
      this.props.onChangePassword(event.target.value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const notice = this.props.notice;

    return (
      <div
        style={{
          width: "600px",
          boxShadow: "3px 3px 8px #cfcfcf",
          borderRadius: "6px",
          margin: "10px",
          padding: "5px"
        }}
      >
          <h3>Enter title here...</h3>
          <h5>Enter description here...</h5>
          <span>Enter body here...</span>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNotice);
