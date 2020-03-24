import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";
import NewNoticeTextInput from "./NewNoticeTextInput";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class NewNoticeBusinessCard extends React.Component {
  render() {
    return <div
    style={{
      display: "inline-block",
      backgroundColor: "white",
      verticalAlign: "top",
      height: "100%",
      paddingTop: "15%",
      paddingLeft: "10%",
      paddingRight: "10%",
      width: "calc(100% - 155px)",
      overflow: "scroll"
    }}
  >
    TBA
  </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNoticeBusinessCard);
