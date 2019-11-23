import React from "react";
import MapComponent from "./MapComponent";

class MainMap extends React.PureComponent {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 1000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `93vh` }} />}
        containerElement={<div style={{ height: `93vh` }} />}
        mapElement={<div style={{ height: `93vh` }} />}
      />
    );
  }
}

export default MainMap;
