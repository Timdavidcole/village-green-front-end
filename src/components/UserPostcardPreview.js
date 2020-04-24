import React from "react";
import { connect } from "react-redux";
import agent from "../agent";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  getAddressAutoComplete: (value) => {
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "addressAutoComplete", value });
  },
  onChangeAddress: (value) =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "address", value }),
});

class UserPostcardPreview extends React.Component {
  constructor() {
    super();
    this.getAddressAutoComplete = this.getAddressAutoComplete.bind(this);
    this.addressAutoComplete = this.addressAutoComplete.bind(this);
  }

  componentDidUpdate() {
    if (this.props.address !== undefined && this.props.address !== "") {
      this.getAddressAutoComplete();
    }
  }

  getAddressAutoComplete() {
    agent.Address.get(this.props.address).then((object) => {
      this.props.getAddressAutoComplete(object);
    });
  }

  addressAutoComplete() {
    if (this.props.addressAutoComplete) {
      return (
        <div>
          {this.props.addressAutoComplete.address.street ? (
            <div>
              {`${this.props.addressAutoComplete.address.houseNumber || ""} ${
                this.props.addressAutoComplete.address.street
              }`}
              ,
            </div>
          ) : null}
          {this.props.addressAutoComplete.address.city ? (
            <div>{`${this.props.addressAutoComplete.address.city}`},</div>
          ) : null}
          {this.props.addressAutoComplete.address.country ? (
            <div>{this.props.addressAutoComplete.address.country},</div>
          ) : null}
          {this.props.addressAutoComplete.address.postalCode ? (
            <div>{this.props.addressAutoComplete.address.postalCode}</div>
          ) : null}
        </div>
      );
    }
  }

  render() {
    if (
      this.props.addressAutoComplete ||
      this.props.username ||
      this.props.image
    ) {
      return (
        <div
          className="user-postcard"
          style={
            this.props.showButton &&
            this.props.addressAutoComplete
              ? { backgroundColor: "azure" }
              : null
          }
        >
          {this.props.image ? (
            <img
              className="user-postcard-pic"
              src={`${this.props.image}`}
            ></img>
          ) : null}
          {this.props.username ? <div>{this.props.username}</div> : null}
          {this.addressAutoComplete()}
          <button
            className="register-button"
            type="submit"
            disabled={this.props.inProgress}
            style={
              this.props.addressAutoComplete && this.props.showButton
                ? { visibility: "visible", opacity: "1" }
                : { visibility: "hidden", opacity: "0" }
            }
          >
            sign up
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPostcardPreview);
