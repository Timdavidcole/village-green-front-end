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

  const buttonClickedStyle = function() {
    if (props.showNewNoticeWindow) {
      return {
        backgroundColor: "white",
        color: "var(--noobo-darker-green)"
      };
    } else return null;
  };

  return (
    <button
      style={buttonClickedStyle()}
      onClick={onClick}
      className="home-button"
    >
      <i class="fas fa-plus"></i>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeButton);
