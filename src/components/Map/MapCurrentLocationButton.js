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
  const currLocOnClick = function() {
    return () =>
      navigator.geolocation.getCurrentPosition(position => {
        props.changeMapCenter({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          location: ""
        });
      });
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
      onClick={currLocOnClick()}
      onMouseUp={onMouseUp}
      href="#"
      className="current-location-button"
    >
      <i className="fa fa-fw fa-location-arrow"></i>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MapHomeButton);
