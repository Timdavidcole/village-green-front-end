import MapNavBar from "./MapNavBar";
import MainMap from "./MainMap";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import Notices from "./Notices";
import NewNotice from "./NewNotice";
import ChangePageButton from "./ChangePageButton"

const mapStateToProps = state => ({
  noticesVisible: state.notices.noticesVisible,
  centerMap: state.map.centerMap,
  loggedIn: state.auth.loggedIn,
  pinnedEvent: state.notices.pinnedEvent,
  newNoticeArrange: state.notices.newNoticeArrange,
  newNotice: state.notices.newNotice,
  notices: state.notices.notices,
  pageNumber: state.notices.pageNumber,
  noticesSorted: state.notices.noticesSorted
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

  whichPageNumberButton(direction) {
    const pageNumber = this.props.pageNumber
    const noticesSorted = this.props.noticesSorted
    if(direction === 'up'){
      if (pageNumber < noticesSorted.length - 1){
        return <ChangePageButton direction="up"/>
      }
    } else if (direction === 'down') {
      if (pageNumber > 0){
        return <ChangePageButton direction="down"/>
      }
    }
  }

  render() {
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div style={{ width: "100%", position: "absolute" }}>
          <MapNavBar />
          {this.whichPageNumberButton('up')}
          {this.whichPageNumberButton('down')}
          <NewNotice />
          <Notices />
        </div>
        <MainMap />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
