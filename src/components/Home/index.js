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
        console.log("RESIZE");
        this.props.resize(
        );
      }, 400);
    });
  }

  componentDidUpdate() {
    if (this.props.pinnedEvent) {
      this.props.updateUnsortedNotices(
        agent.Notices.all(JSON.stringify(this.props.centerMap))
      );
    }
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
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
