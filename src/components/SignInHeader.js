import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  ...state.auth,
  centerMap: state.map.centerMap,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: "LOGIN", payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: "LOGIN_PAGE_UNLOADED" }),
  updateUnsortedNotices: (payload) =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
});

class SignInHeader extends React.Component {
  constructor() {
    super();
    this.changeEmail = (event) => this.props.onChangeEmail(event.target.value);
    this.changePassword = (event) =>
      this.props.onChangePassword(event.target.value);
    this.submitForm = (email, password) => (event) => {
      event.preventDefault();
      this.props.onSubmit(email, password);
      this.props.updateUnsortedNotices(
        agent.Notices.all(JSON.stringify(this.props.centerMap))
      );
    };
  }

  render() {
    const { email, password } = this.props;
    return (
      <div className="sign-in-container">
        <form
          className="sign-in-form"
          onSubmit={this.submitForm(email, password)}
        >
          <input
            className="sign-in-input"
            type="email"
            placeholder="Email"
            value={email}
            autocomplete="new-password"
            onChange={this.changeEmail}
          />

          <input
            className="sign-in-input"
            type="password"
            placeholder="Password"
            value={password}
            autocomplete="new-password"
            onChange={this.changePassword}
          />

          <button
            className="sign-in-button"
            type="submit"
            disabled={this.props.inProgress}
          >
            sign in
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInHeader);
