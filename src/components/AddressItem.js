import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.auth });

class AddressItem extends React.Component {
  render() {
    return (
      <fieldset>
        <label>{this.props.label}</label>
        <input
          style={{margin:"0px", padding:"7px", borderRadius:"5px", border:"none"}}
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

