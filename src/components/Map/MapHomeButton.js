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
  const homeOnClick = function() {
    if (props.currentUser) {
      return () =>
        props.changeMapCenter({
          coordinates: {
            lat: props.currentUser.location.coordinates[0],
            lng: props.currentUser.location.coordinates[1]
          },
          location: "home"
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
    style={{
      backgroundColor: props.location === 'home' ? "white" : "#70bf6d",
      color: props.location === 'home' ? "#70bf6d" : "white"
    }}
      onClick={homeOnClick()}
      onMouseUp={onMouseUp}
      className="home-button"
    >
      <i class="fas fa-home"></i>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MapHomeButton);
