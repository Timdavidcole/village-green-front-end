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

class AddressContainer extends React.Component {
  constructor() {
    super();
    this.addressAutoComplete = this.addressAutoComplete.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.addressAutoComplete && nextProps.addressAutoComplete) {
      if (
        this.props.addressAutoComplete.label !==
        nextProps.addressAutoComplete.label
      ) {
        return true;
      }
    }
    if (this.props.address !== nextProps.address) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    if (this.props.address !== undefined && this.props.address !== "") {
      this.addressAutoComplete();
    }
  }

  addressAutoComplete() {
    agent.Address.get(this.props.address).then((object) => {
      this.props.getAddressAutoComplete(object);
    });
  }

  render() {
    if (this.props.addressAutoComplete) {
      return (
        <div>
          {this.props.addressAutoComplete.address.street ? (
            <div>{`${
              this.props.addressAutoComplete.address.houseNumber || ""
            } ${this.props.addressAutoComplete.address.street}`}</div>
          ) : null}
          {this.props.addressAutoComplete.address.city ? (
            <div>{`${this.props.addressAutoComplete.address.city || ""}`}</div>
          ) : null}
          {this.props.addressAutoComplete.address.country ? (
            <div>{this.props.addressAutoComplete.address.country}</div>
          ) : null}
          {this.props.addressAutoComplete.address.postalCode ? (
            <div>{this.props.addressAutoComplete.address.postalCode}</div>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer);
