import React from "react";
import { connect } from "react-redux";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 51.508402, lng: -0.126326 },
      map: ""
    };
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.setState({
        center: {
          lat: this.props.currentUser.homeXCoord,
          lng: this.props.currentUser.homeYCoord
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(position =>
        this.updatePosition(position)
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.map !== nextState.map ||
      this.props.isMarkerShown !== nextProps.isMarkerShown ||
      this.state.center !== nextState.center ||
      this.props.currentUser !== nextProps.currentUser
    ) {
      if (
        this.props.currentUser !== nextProps.currentUser &&
        nextProps.currentUser
      ) {
        this.setState({
          center: {
            lat: nextProps.currentUser.homeXCoord,
            lng: nextProps.currentUser.homeYCoord
          }
        });
        return true;
      } else return true;
      return true;
    } else return false;
  }

  updatePosition(position) {
    this.setState({
      center: { lat: position.coords.latitude, lng: position.coords.longitude }
    });
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={16}
        ref={thisMap => this.setState({ map: thisMap })}
        center={this.state.center}
        onCenterChanged={() =>
          this.setState({ center: this.state.map.getCenter().toJSON() })
        }
      >
        {this.props.isMarkerShown && <Marker position={this.state.center} />}
      </GoogleMap>
    );
  }
}

export default connect(mapStateToProps)(
  withScriptjs(withGoogleMap(MapComponent))
);
