import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";
import NewNoticeTextInput from "./NewNoticeTextInput";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class NewNoticeBusinessCard extends React.Component {
  render() {
    return <NewNoticeTextInput />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNoticeBusinessCard);
