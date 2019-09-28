import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "email", value }),
  onChangePassword: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "password", value }),
  onChangeUsername: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "username", value }),
  onChangeAddress: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "address", value }),
});

class AddressItem extends React.Component {
  render() {
    return (
      <fieldset >
        <label>{this.props.label}</label>
        <input
          style={{width:"100%"}}
          type="text"
          defaultValue={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
      </fieldset>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressItem);

