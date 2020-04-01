import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  noticesHiddenBol: state.notices.noticesHidden
});

const mapDispatchToProps = dispatch => ({
  noticesHidden: payload => dispatch({ type: "NOTICES_HIDDEN", payload })
});

const HideNoticesButton = props => {
  const onClick = function() {
    props.noticesHidden("toggle");
  };

  const buttonClickedStyle = function() {
    if (props.noticesHiddenBol) {
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
      {props.noticesHiddenBol ? (
        <i class="fas fa-map-marked-alt"></i>
      ) : (
        <i class="fas fa-map-marked-alt"></i>
      )}
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HideNoticesButton);
