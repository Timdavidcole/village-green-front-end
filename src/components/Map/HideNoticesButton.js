import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  noticesHidden: payload => dispatch({ type: "NOTICES_HIDDEN", payload })
});

const HideNoticesButton = props => {
  const onClick = function() {
    props.noticesHidden("toggle");
  };

  return (
    <button onClick={onClick} className="home-button">
      Hide Notices
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HideNoticesButton);
