import React from "react";
import MapComponent from "./MapComponent";
import { connect } from "react-redux";
import PageScroll from "../Home/PageScroll";

const mapStateToProps = state => ({
  mapBlur: state.notices.mapBlur,
  noticesSorted: state.notices.noticesSorted,
  pageNumber: state.notices.pageNumber
});

const mapDispatchToProps = dispatch => ({
  updatePageNumber: payload =>
    dispatch({ type: "UPDATE_PAGE_NUMBER", payload }),
  startPageNumberAnimation: payload =>
    dispatch({ type: "START_PAGE_NUMBER_ANIMATION", payload })
});

class MainMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isMarkerShown: false
    };
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
          opacity: this.props.mapBlur ? "0.25" : "1",
          height: "calc(100vh - 56px)",
          width: "100%"
        }}
        ref={this.myRef}
      >
        {this.myRef.current ? (
          <PageScroll element={this.myRef.current} />
        ) : null}
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
