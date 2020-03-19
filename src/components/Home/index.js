import MapNavBar from "../Map/MapNavBar";
import MainMap from "../Map/MainMap";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import Notices from "./Notices";
import NewNoticeWindow from "../NewNotice/NewNoticeWindow";
import Loader from "./Loader";

const mapStateToProps = state => ({
  noticesVisible: state.notices.noticesVisible,
  centerMap: state.map.centerMap,
  loggedIn: state.auth.loggedIn,
  pinnedEvent: state.notices.pinnedEvent,
  newNoticeArrange: state.notices.newNoticeArrange,
  newNotice: state.notices.newNotice,
  notices: state.notices.notices,
  noticesSorted: state.notices.noticesSorted,
  loadingNotices: state.notices.loading,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
  resize: () => dispatch({ type: "RESIZE" }),
  loading: () => dispatch({ type: "LOADING" })
});

class Home extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Notices.all(JSON.stringify(this.props.centerMap)));
    var doit;
    window.addEventListener("resize", () => {
      this.props.loading();
      clearTimeout(doit);
      doit = setTimeout(() => {
        this.props.resize();
      }, 200);
    });
  }

  componentDidUpdate() {
    if (this.props.pinnedEvent) {
      this.props.updateUnsortedNotices(
        agent.Notices.all(JSON.stringify(this.props.centerMap))
      );
    } else if (this.props.newNoticeArrange) {
      this.props.updateUnsortedNotices({
        notices: [this.props.newNotice, ...this.props.notices]
      });
    }
  }

  render() {
    console.log(this.props.loadingNotices)
    return (
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 56px)",
          overflow: "hidden"
        }}
      >
        <div style={{ width: "100%", position: "absolute" }}>
          <MapNavBar />
          {this.props.loadingNotices ? <Loader /> : null}
          <NewNoticeWindow />
          <Notices />
        </div>
        <MainMap />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
