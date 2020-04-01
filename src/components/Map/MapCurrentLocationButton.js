import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";
import agent from "../../agent";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  location: state.map.location
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
          location: "current"
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

  const buttonClickedStyle = function() {
    if (props.location === "current") {
      return {
        backgroundColor: "white",
        color: "var(--noobo-darker-green)"
      };
    } else return null;
  };

  return (
    <button
      style={buttonClickedStyle()}
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
