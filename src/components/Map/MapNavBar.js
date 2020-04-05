import React from "react";
import { connect } from "react-redux";
import MapSearchBox from "./MapSearchBox";
import MapHomeButton from "./MapHomeButton";
import MapCurrentLocationButton from "./MapCurrentLocationButton";
import HideNoticesButton from "./HideNoticesButton";
import NoticeSizeSlider from "./NoticeSizeSlider";
import NewNoticeButton from "./NewNoticeButton";

const mapStateToProps = (state) => ({ currentUser: state.common.currentUser });

const mapDispatchToProps = (dispatch) => ({});

class MapNavBar extends React.Component {
  render() {
    console.log(this.props.currentUser);
    return (
      <div className="navbar">
        {this.props.currentUser ? (
          <React.Fragment>
            <MapHomeButton />
            <MapCurrentLocationButton />
            <NewNoticeButton />
          </React.Fragment>
        ) : null}
        <NoticeSizeSlider />
        <MapSearchBox />
        <HideNoticesButton />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapNavBar);
