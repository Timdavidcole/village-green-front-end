import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import "../styles/register.css";
import UserPostcardPreview from "./UserPostcardPreview";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (user) =>
    dispatch({
      type: "REGISTER",
      payload: agent.Auth.register(
        user.username,
        user.email,
        user.password,
        user.address,
        user.image
      ),
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
      image: "",
    };
    this.submitForm = (user) => (event) => {
      event.preventDefault();
      this.props.onSubmit(user);
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
    this.setState({ address: ev.target.value });
    if (ev.target.value === "") {
      this.props.getAddressAutoComplete(null);
    } else {
      agent.Address.get(ev.target.value).then((object) => {
        console.log(object)
        this.props.getAddressAutoComplete(object);
      });
    }
  }

  showButton() {
    if (
      this.state.address &&
      this.state.email &&
      this.state.password &&
      this.state.username
    ) {
      return { visibility: "visible", opacity: "1" };
    } else return { visibility: "hidden", opacity: "0" };
  }

  render() {
    const { email, password, username, address, image } = this.state;

    return (
      <div>
        <ListErrors errors={this.props.errors} />
        <form
          className="register-form"
          onSubmit={this.submitForm({
            username: username,
            email: email,
            password: password,
            address: this.addressAutoComplete(),
            image: image,
          })}
        >
          <fieldset className="register-fieldset">
            <div className="register-title">
              Great! We're just going to need some details before you start posting...
            </div>
            <input
              className="register-input"
              type="email"
              placeholder="email"
              value={email}
              autocomplete="no"
              onChange={(ev) => {
                this.setState({ email: ev.target.value });
              }}
              required="true"
            />
            <input
              className="register-input"
              type="password"
              placeholder="password"
              value={password}
              autocomplete="new-password"
              onChange={(ev) => {
                this.setState({ password: ev.target.value });
              }}
              required="true"
            />
            <input
              className="register-input"
              type="username"
              placeholder="username"
              value={username}
              autocomplete="no"
              onChange={(ev) => {
                this.setState({ username: ev.target.value });
              }}
              required="true"
            />
            <input
              className="register-input"
              type="text"
              value={address}
              placeholder={"address"}
              autocomplete="no"
              onChange={this.changeAddress}
              required="true"
            />
            <input
              className="register-input"
              type="url"
              value={image}
              placeholder={"profile picture URL (optional)"}
              autocomplete="no"
              onChange={(ev) => {
                this.setState({ image: ev.target.value });
              }}
              required="true"
            />
            <UserPostcardPreview
              username={this.state.username}
              image={this.state.image}
              showButton={this.showButton()}
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
