import React from "react";
import MapComponent from "./MapComponent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  mapBlur: state.notices.mapBlur
});

const mapDispatchToProps = dispatch => ({});
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
      <div style={{ opacity: this.props.mapBlur ? '0.25' : '1'}}>
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
