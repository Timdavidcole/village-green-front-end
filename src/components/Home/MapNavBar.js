import React from "react";
import { connect } from "react-redux";

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
      borderRadius: "3px",
      backgroundColor: "#70bf6d",
      color: "white",
      outline: 0
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
      navigator.geolocation.getCurrentPosition(position =>
        this.props.changeMapCenter({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          location: ""
        })
      );
  }

  homeButton() {
    console.log(this.props.currentUser);
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
    console.log(this.props.currentUser);
    return (
      <div className="map-nav-bar-container">
        <div className="navbar" style={{ margin: "0px" }}>
          {this.homeButton()}
          <button
            onClick={this.currLocOnClick()}
            href="#"
            style={this.buttonStyle()}
          >
            <i class="fa fa-fw fa-location-arrow"></i> Current Location
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapNavBar);
