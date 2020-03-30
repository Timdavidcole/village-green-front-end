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

  const buttonClickedStyle = function() {
    if (props.location === "home") {
      return {
        backgroundColor: "white",
        color: "#70bf6d"
      };
    } else return null;
  };

  return (
    <button
      style={buttonClickedStyle()}
      onClick={homeOnClick()}
      onMouseUp={onMouseUp}
      className="home-button"
    >
      <i class="fas fa-home"></i>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MapHomeButton);
