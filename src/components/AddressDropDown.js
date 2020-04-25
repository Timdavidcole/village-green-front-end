import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({});

class AddressDropDown extends React.Component {
  dropDownSlide() {
    return this.props.addressAutoComplete && this.props.focusPostcode
      ? { maxHeight: "70px" }
      : { maxHeight: "0px" };
  }
  render() {
    if (this.props.addressAutoComplete && this.props.focusPostcode) {
      return (
        <div className="address-dropdown" style={this.dropDownSlide()}>
          {this.props.addressAutoComplete.map((address, index) => {
            return (
              <div key={index} className="address-dropdown-item">
                {address.line_1}
              </div>
            );
          })}
        </div>
      );
    } else
      return (
        <div className="address-dropdown" style={this.dropDownSlide()}></div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressDropDown);
