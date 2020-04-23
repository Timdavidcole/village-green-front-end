import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import "../styles/register.css";
import AddressContainer from "./AddressContainer";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, email, password, address) =>
    dispatch({
      type: "REGISTER",
      payload: agent.Auth.register(username, email, password, address),
    }),
  getAddressAutoComplete: (value) => {
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "addressAutoComplete", value });
  },
});

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
      address: "",
    };
    this.submitForm = (username, email, password, address) => (event) => {
      event.preventDefault();
      this.props.onSubmit(username, email, password, address);
    };
    this.addressAutoComplete = this.addressAutoComplete.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
  }

  addressAutoComplete() {
    if (this.state.address && this.props.addressAutoComplete) {
      return (
        this.props.addressAutoComplete.address.houseNumber +
        " " +
        this.props.addressAutoComplete.address.street +
        ", " +
        this.props.addressAutoComplete.address.city +
        ", " +
        this.props.addressAutoComplete.address.country +
        ", " +
        this.props.addressAutoComplete.address.postalCode
      );
    } else return null;
  }

  changeAddress(ev) {
    console.log(ev.target.value)
    this.setState({ address: ev.target.value });
    agent.Address.get(ev.target.value).then(object => {
      this.props.getAddressAutoComplete(object);
    });
  }

  render() {
    const { email, password, username, address } = this.state;

    return (
      <div>
        <ListErrors errors={this.props.errors} />
        <form
          className="register-form"
          onSubmit={this.submitForm(
            username,
            email,
            password,
            this.addressAutoComplete()
          )}
        >
          <fieldset className="register-fieldset">
            <div className="register-flex">
              <input
                className="register-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => {
                  this.setState({ email: ev.target.value });
                }}
              />
              <input
                className="register-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => {
                  this.setState({ password: ev.target.value });
                }}
              />
              <input
                className="register-input"
                type="username"
                placeholder="Username"
                value={username}
                onChange={(ev) => {
                  this.setState({ username: ev.target.value });
                }}
              />
              <input
                className="register-input"
                type="text"
                value={address}
                placeholder={"Address"}
                onChange={this.changeAddress}
              />
              <AddressContainer />
              <button
                className="register-button"
                type="submit"
                disabled={this.props.inProgress}
              >
                {" "}
                Sign Up
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
