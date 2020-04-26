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
    if (this.props.selectedAddress !== undefined) {
      const address = this.props.addressAutoComplete[
        this.props.selectedAddress
      ];
      return (
        <div>
          {address.line_1 ? <div>{address.line_1},</div> : null}
          {address.line_2 ? <div>{address.line_2},</div> : null}
          {address.line_3 ? <div>{address.line_3},</div> : null}
          {address.post_town ? <div>{address.post_town},</div> : null}
          {address.country ? <div>{address.country}</div> : null}
          {address.postcode ? <div>{address.postcode}</div> : null}
        </div>
      );
    }
  }

  render() {
    if (
      this.props.selectedAddress !== undefined ||
      this.props.username ||
      this.props.image
    ) {
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
                  ? { opacity: "1", transform: "scale(1,1)" }
                  : { opacity: "0", transform: "scale(0,0)" }
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
