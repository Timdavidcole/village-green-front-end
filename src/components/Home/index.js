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
    console.log("INDEX MOUNT");
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
    console.log("INDEX UPDATED")
    console.log(this.props.newNoticeArrange)
    if (this.props.pinnedEvent) {
      console.log("PINNED EVENT ARRANGE");
      this.props.updateUnsortedNotices(
        agent.Notices.all(JSON.stringify(this.props.centerMap))
      );
    } else if (this.props.newNoticeArrange) {
      console.log("NEW NOTICE ARRANGE");
      agent.Notices.all(JSON.stringify(this.props.centerMap)).then(notices => {
        this.props.updateUnsortedNotices({
          notices: [this.props.newNotice, ...notices.notices]
        });
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
