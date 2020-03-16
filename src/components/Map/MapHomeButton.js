import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";
import agent from "../../agent";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  changeMapCenter: payload => dispatch({ type: "CHANGE_CENTER", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload })
});

const MapHomeButton = props => {
  const homeOnClick = function() {
    if (props.currentUser) {
      return () =>
        props.changeMapCenter({
          coordinates: {
            lat: props.currentUser.location.coordinates[0],
            lng: props.currentUser.location.coordinates[1]
          },
          location: "HOME"
        });
    } else return null;
  };

  const onMouseUp = function() {
    props.updateUnsortedNotices(
      agent.Notices.all(
        JSON.stringify({
          lat: props.currentUser.location.coordinates[0],
          lng: props.currentUser.location.coordinates[1]
        })
      )
    );
  };

  return (
    <button
      onClick={homeOnClick()}
      onMouseUp={onMouseUp}
      className="home-button"
    >
      <i className="fa fa-fw fa-home"></i> Home
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MapHomeButton);
