import MapNavBar from "./MapNavBar";
import MainMap from "./MainMap";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import Notices from "./Notices";
import NewNotice from "./NewNotice";

const mapStateToProps = state => ({
  noticesVisible: state.notices.noticesVisible,
  centerMap: state.map.centerMap,
  loggedIn: state.auth.loggedIn,
  pinnedEvent: state.notices.pinnedEvent,
  newNoticeArrange: state.notices.newNoticeArrange,
  newNotice: state.notices.newNotice,
  notices: state.notices.notices
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
  resize: () => dispatch({ type: "RESIZE" })
});

class Home extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Notices.all(JSON.stringify(this.props.centerMap)));
    var doit;
    window.addEventListener("resize", () => {
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
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div style={{ width: "100%", position: "absolute" }}>
          <MapNavBar />
          <NewNotice />
          <Notices />
        </div>
        <MainMap />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
