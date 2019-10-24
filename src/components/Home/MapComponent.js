import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCoordinates: { lat: 51.508402, lng: -0.126326 }
    };
  }

  render() {
    return (
      <GoogleMap defaultZoom={8} defaultCenter={this.state.defaultCoordinates}>
        {this.props.isMarkerShown && (
          <Marker position={this.state.defaultCoordinates} />
        )}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MapComponent));
