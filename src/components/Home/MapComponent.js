import React from "react";
import { connect } from "react-redux";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  centerMap: state.map.centerMap,
  centerLocation: state.map.location
});

const mapDispatchToProps = dispatch => ({
  changeMapCenter: payload => dispatch({ type: "CHANGE_CENTER", payload })
});

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 51.508402, lng: -0.126326 },
      map: ""
    };
    this.updateCenterPosition = this.updateCenterPosition.bind(this);
    this.markerIcon = this.markerIcon.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.updateCenterPosition(
        this.props.currentUser.homeXCoord,
        this.props.currentUser.homeYCoord,
        "HOME"
      );
    } else {
      navigator.geolocation.getCurrentPosition(position =>
        this.updateCenterPosition(
          position.coords.latitude,
          position.coords.longitude,
          ""
        )
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.map !== nextState.map ||
      this.props.isMarkerShown !== nextProps.isMarkerShown ||
      this.props.centerMap !== nextProps.centerMap ||
      this.props.currentUser !== nextProps.currentUser
    ) {
      if (
        this.props.currentUser !== nextProps.currentUser &&
        nextProps.currentUser
      ) {
        this.updateCenterPosition(
          nextProps.currentUser.homeXCoord,
          nextProps.currentUser.homeYCoord,
          "HOME"
        );
        return true;
      } else return true;
    } else return false;
  }

  updateCenterPosition(lat, lng, loc = "") {
    this.props.changeMapCenter({
      coordinates: { lat: lat, lng: lng },
      location: loc
    });
  }

  markerIcon() {
    console.log(this.props.centerLocation);
    if (this.props.currentUser && this.props.centerLocation === "HOME") {
      return {
        icon: {
          url: require("./icons8-home-address-64.png"),
          scaledSize: { width: 64, height: 64 }
        }
      };
    } else
      return {
        icon: {
          url: require("./icons8-arrow-pointing-down-100.png"),
          scaledSize: { width: 64, height: 64 }
        }
      };
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={16}
        ref={thisMap => this.setState({ map: thisMap })}
        center={this.props.centerMap}
        defaultOptions={{ mapTypeControl: false }}
        onCenterChanged={() =>
          this.props.changeMapCenter({
            coordinates: this.state.map.getCenter().toJSON(),
            location: ""
          })
        }
      >
        {this.props.isMarkerShown && (
          <Marker options={this.markerIcon()} position={this.props.centerMap} />
        )}
      </GoogleMap>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withScriptjs(withGoogleMap(MapComponent)));
