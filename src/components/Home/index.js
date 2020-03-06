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
  notices: state.notices.notices,
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  // hideNewNoticeWindow: () => dispatch({ type: "HIDE_NEW_NOTICE" })
});

class Home extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Notices.all(JSON.stringify(this.props.centerMap)));
  }

  // collapse() {
  //   this.setState({ expanded: false });
  // }

  render() {
    return (
      <div
        // tabIndex="0"
        // onBlur={this.props.hideNewNoticeWindow}
        style={{ width: "100%" }}
      >
        <div style={{ width: "100%", position: "absolute" }}>
          <MapNavBar />
          <NewNotice />
          <Notices
            noticesVisible={this.props.noticesVisible}
            notices={this.props.notices || []}
          />
        </div>
        <MainMap />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
