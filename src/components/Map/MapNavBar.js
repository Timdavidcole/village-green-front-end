import React from "react";
import { connect } from "react-redux";
import MapSearchBox from "./MapSearchBox";
import MapHomeButton from "./MapHomeButton";
import MapCurrentLocationButton from "./MapCurrentLocationButton";
import HideNoticesButton from "./HideNoticesButton";
import NoticeSizeSlider from "./NoticeSizeSlider";
import NewNoticeButton from "./NewNoticeButton";
import "../../styles/mapStyles.css";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  noticesHidden: state.notices.noticesHidden
});

const mapDispatchToProps = dispatch => ({
  changeMapCenter: payload => dispatch({ type: "CHANGE_CENTER", payload })
});

class MapNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.buttonStyle = this.buttonStyle.bind(this);
    this.homeOnClick = this.homeOnClick.bind(this);
    this.currLocOnClick = this.currLocOnClick.bind(this);
  }
  buttonStyle() {
    return {
      margin: "3px",
      padding: "5px",
      paddingRight: "8px",
      borderRadius: "5px",
      backgroundColor: "#70bf6d",
      color: "white",
      outline: 0,
      boxShadow: "10px 10px 20px 3px rgba(176,176,176,0.79)",
      visibility: "visible"
    };
  }

  homeOnClick() {
    if (this.props.currentUser) {
      return () =>
        this.props.changeMapCenter({
          coordinates: {
            lat: this.props.currentUser.location.coordinates[0],
            lng: this.props.currentUser.location.coordinates[1]
          },
          location: "HOME"
        });
    } else return null;
  }

  currLocOnClick() {
    return () =>
      navigator.geolocation.getCurrentPosition(position => {
        this.props.changeMapCenter({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          location: ""
        });
      });
  }

  render() {
    return (
      <div
        className="navbar"
        style={{
          position: "absolute",
          margin: "5px",
          zIndex: "500",
          width: "100%",
          visibility: "hidden",
          paddingBottom: "0px",
          backgroundColor: "transparent"
        }}
      >
        <MapHomeButton />
        <MapCurrentLocationButton />
        <HideNoticesButton />
        <NewNoticeButton />
        <NoticeSizeSlider />
        <MapSearchBox />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapNavBar);
