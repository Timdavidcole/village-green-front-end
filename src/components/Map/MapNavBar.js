import React from "react";
import { connect } from "react-redux";
import MapSearchBox from "./MapSearchBox";
import MapHomeButton from "./MapHomeButton";
import MapCurrentLocationButton from "./MapCurrentLocationButton";
import HideNoticesButton from "./HideNoticesButton";
import NoticeSizeSlider from "./NoticeSizeSlider";
import NewNoticeButton from "./NewNoticeButton";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class MapNavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
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
