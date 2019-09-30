import React from "react";
import { connect } from "react-redux";
import agent from "../agent";
import AddressItem from "./AddressItem";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  getAddressAutoComplete: value => {
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "addressAutoComplete", value });
  },
  onChangeAddress: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "address", value }),
});

class AddressContainer extends React.Component {
  constructor() {
    super();
    this.addressAutoComplete = this.addressAutoComplete.bind(this);
    this.confirmAddress = this.confirmAddress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
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
    agent.Address.get(this.props.address).then(object => {
      this.props.getAddressAutoComplete(object);
    });
  }

  confirmAddress(event){
    this.props.onChangeAddress(this.props.addressAutoComplete.label)
  }

  render() {
    if (this.props.addressAutoComplete) {
      return (
        <div style={{margin:"10px"}}>
          <center>
            <SlideDown className={"my-dropdown-slidedown"}>
              <AddressItem
                value={this.props.addressAutoComplete.address.houseNumber}
                placeholder="Housenumber"
              />
              <AddressItem
                value={this.props.addressAutoComplete.address.street}
                placeholder="Street"
              />
              <AddressItem
                value={this.props.addressAutoComplete.address.city}
                placeholder="City"
              />
              <AddressItem
                value={this.props.addressAutoComplete.address.country}
                placeholder="Country"
              />
              <AddressItem
                value={this.props.addressAutoComplete.address.postalCode}
                placeholder="Post Code"
              />
            </SlideDown>
            <button type="submit" className="btn btn-primary" onClick={(event) => this.confirmAddress()}>Look right?</button>
          </center>
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
)(AddressContainer);
