import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.auth });

class AddressItem extends React.Component {
  render() {
    return (
      <fieldset>
        <label>{this.props.label}</label>
        <input
          style={{width:"50%", margin:"3px", borderRadius:"10px"}}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
      </fieldset>  
    );
  }
}

export default connect(
  mapStateToProps
)(AddressItem);

