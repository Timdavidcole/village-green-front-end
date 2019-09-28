import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import AddressContainer from "./AddressContainer";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "password", value }),
  onChangeUsername: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "username", value }),
  onChangeAddress: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "address", value }),
  onSubmit: (username, email, password, address) =>
    dispatch({
      type: "REGISTER",
      payload: agent.Auth.register(username, email, password, address)
    })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = event => this.props.onChangeEmail(event.target.value);
    this.changePassword = event =>
      this.props.onChangePassword(event.target.value);
    this.changeUsername = event =>
      this.props.onChangeUsername(event.target.value);
    this.changeAddress = event => {
      this.props.onChangeAddress(event.target.value);
    };
    this.submitForm = (username, email, password, address) => event => {
      event.preventDefault();
      this.props.onSubmit(username, email, password, address);
    };
  }

  render() {
    const { email, password, username, address } = this.props;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <ListErrors errors={this.props.errors} />
              <form
                onSubmit={this.submitForm(username, email, password, address)}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.changeEmail}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.changeUsername}
                    />
                  </fieldset>
                  Address
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      value={address}
                      onChange={this.changeAddress}
                    />
                  </fieldset>

                  <AddressContainer />
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    {" "}
                    Sign Up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
