import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch({ type: "DISPLAY_NEW_NOTICE" })
});

const NewNoticeButton = props => {
  const onClick = function() {
    props.onClick();
  };
  return (
    <button
      style={{
        backgroundColor: props.showNewNoticeWindow ? "white" : "#70bf6d",
        color: props.showNewNoticeWindow ? "#70bf6d" : "white"
      }}
      onClick={onClick}
      className="home-button"
    >
      <i class="fas fa-plus"></i>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeButton);
