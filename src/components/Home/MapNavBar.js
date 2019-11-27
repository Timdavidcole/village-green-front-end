import React from "react";
import { connect } from "react-redux";
import MapSearchBox from "./MapSearchBox";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
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
    this.homeButton = this.homeButton.bind(this);
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
      boxShadow: "10px 10px 20px 3px rgba(176,176,176,0.79)"
    };
  }

  homeOnClick() {
    if (this.props.currentUser) {
      return () =>
        this.props.changeMapCenter({
          coordinates: {
            lat: this.props.currentUser.homeXCoord,
            lng: this.props.currentUser.homeYCoord
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

  homeButton() {
    if (this.props.currentUser) {
      return (
        <button
          onClick={this.homeOnClick()}
          class="active"
          style={this.buttonStyle()}
          href="#"
        >
          <i class="fa fa-fw fa-home"></i> Home
        </button>
      );
    } else return null;
  }

  render() {
    return (
      <div>
        <div
          className="navbar"
          style={{
            margin: "0px",
            zIndex: "50",
            width: "100%"
          }}
        >
          {this.homeButton()}
          <button
            onClick={this.currLocOnClick()}
            href="#"
            style={this.buttonStyle()}
          >
            <i class="fa fa-fw fa-location-arrow"></i> Current Location
          </button>
          <MapSearchBox />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapNavBar);
