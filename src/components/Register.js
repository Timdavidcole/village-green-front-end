import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import "../styles/register.css";
import UserPostcardPreview from "./UserPostcardPreview";
import AddressDropDown from "./AddressDropDown";

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
      postcode: "",
      image: "",
      focusPostcode: false,
    };
    this.submitForm = (user) => (event) => {
      event.preventDefault();
      this.props.onSubmit(user);
    };
    this.addressAutoComplete = this.addressAutoComplete.bind(this);
    this.findAddress = this.findAddress.bind(this);
  }

  addressAutoComplete() {
    if (this.props.selectedAddress && this.props.addressAutoComplete) {
      const address = this.props.addressAutoComplete[
        this.props.selectedAddress
      ];
      console.log(address);
      return (
        (address.line_1 ? address.line_1 + ", " : '') +
        (address.line_2 ? address.line_2 + ", " : '') +
        (address.line_3 ? address.line_3 + ", " : '') +
        (address.country ? address.country + ", " : '') +
        (address.postcode ? address.postcode : '')
      );
    } else return null;
  }

  findAddress(event) {
    document.getElementById("postcode-input").focus();
    event.preventDefault();
    agent.Address.get(this.state.postcode).then((object) => {
      this.props.getAddressAutoComplete(object);
    });
  }

  showButton() {
    return (
      this.props.selectedAddress &&
      this.state.email &&
      this.state.password &&
      this.state.username
    );
  }

  render() {
    console.log(this.addressAutoComplete());
    const { email, password, username, postcode, image } = this.state;
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
              Great! We're just going to need some info before you can start
              posting...
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
            <div style={{ position: "relative" }}>
              <input
                id="postcode-input"
                className="register-input"
                type="text"
                value={postcode}
                placeholder={"postcode"}
                autocomplete="chrome-off"
                onChange={(ev) => this.setState({ postcode: ev.target.value })}
                required="true"
                onFocus={() => this.setState({ focusPostcode: true })}
                onBlur={() => this.setState({ focusPostcode: false })}
              ></input>
              <AddressDropDown focusPostcode={this.state.focusPostcode} />
              <button
                id="find-address-button"
                type="button"
                style={
                  this.state.focusPostcode && this.state.postcode
                    ? { opacity: "1" }
                    : { opacity: "0" }
                }
                className="find-address-button"
                onClick={this.findAddress}
              >
                find address
              </button>
            </div>

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
              focusPostcode={this.state.focusPostcode}
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
