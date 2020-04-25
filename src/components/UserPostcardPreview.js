import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  getAddressAutoComplete: (value) => {
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "addressAutoComplete", value });
  },
  onChangeAddress: (value) =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "address", value }),
});

class UserPostcardPreview extends React.Component {
  addressAutoComplete() {
    if (this.props.addressAutoComplete) {
      return (
        <div>
          <div
            className={"address-autocomplete-tooltip"}
            style={this.props.focusAddress ? { opacity: 1 } : { opacity: 0 }}
          >please check your details are correct</div>
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
      console.log(this.props.addressAutoComplete);
      return (
        <div
          className="user-postcard"
          style={
            this.props.showButton && this.props.addressAutoComplete
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
          {this.props.username ? <div>{this.props.username},</div> : null}
          {this.addressAutoComplete()}
          <div className="register-button-container">
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
