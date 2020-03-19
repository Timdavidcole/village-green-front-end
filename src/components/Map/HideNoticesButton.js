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
  return (
    <button onClick={onClick} className="home-button">
      {props.noticesHiddenBol ? <i class="fas fa-sticky-note"></i>

      : <i class="fas fa-sticky-note"></i>

    }
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HideNoticesButton);
