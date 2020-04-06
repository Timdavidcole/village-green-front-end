import React from "react";
import MapComponent from "./MapComponent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  mapBlur: state.notices.mapBlur
});

const mapDispatchToProps = dispatch => ({});

class MainMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false
    };
  }

  componentDidMount() {
    this.setState({ ref: this.myRef });
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
      <div
        id="main-map"
        style={{
          position: "absolute",
          zIndex: "1",
          opacity: this.props.mapBlur ? "0.5" : "1",
          height: "calc(100vh - 56px)",
          width: "100%"
        }}
      >
        <MapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: "calc(100vh - 56px)" }} />}
          containerElement={<div style={{ height: "calc(100vh - 56px)" }} />}
          mapElement={<div style={{ height: "calc(100vh - 56px)" }} />}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);
