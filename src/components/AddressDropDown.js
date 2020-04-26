import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  selectAddress: (index) => {
    dispatch({ type: "SELECT_ADDRESS", index });
  },
});

class AddressDropDown extends React.Component {
  dropDownSlide() {
    return this.props.addressAutoComplete && this.props.focusPostcode
      ? { maxHeight: "70px", marginTop: "10px" }
      : { maxHeight: "0px", marginTop: "0px" };
  }
  render() {
    if (this.props.addressAutoComplete) {
      return (
        <div className="address-dropdown" style={this.dropDownSlide()}>
          {this.props.addressAutoComplete.map((address, index) => {
            return (
              <div
                onClick={() => this.props.selectAddress(index)}
                key={index}
                className="address-dropdown-item"
              >
                {address.line_1 ? address.line_1 + ", " : null}
                {address.line_2 ? address.line_2 : null}
              </div>
            );
          })}
          <br></br>
        </div>
      );
    } else
      return (
        <div className="address-dropdown" style={this.dropDownSlide()}></div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressDropDown);
