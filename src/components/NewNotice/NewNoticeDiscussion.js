import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";
// import NewNoticeTextInput from "./NewNoticeTextInput";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

class NewNoticeDiscussion extends React.Component {
  render() {
    return (
      <div
        style={{
          borderRadius: "0px 10px 10px 0px",
          display: "inline-block",
          backgroundColor: "white",
          verticalAlign: "top",
          height: "100%",
          width: "49vw",
          overflow: "none",
        }}
      >
        TBA
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNoticeDiscussion);
