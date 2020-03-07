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
  loggedIn: state.auth.loggedIn,
  noticesWithDim: state.notices.noticesWithDim
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

class Home extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Notices.all(JSON.stringify(this.props.centerMap)));
  }

  withDimOrNotWithDim() {
    if (this.props.noticesWithDim.length === this.props.notices.length) {
      return this.props.noticesWithDim;
    } else {
      return this.props.notices || [];
    }
  }

  render() {
    if (this.props.noticesWithDim.length === this.props.notices.length) {
    }
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", position: "absolute" }}>
          <MapNavBar />
          <NewNotice />
          <Notices
            noticesVisible={this.props.noticesVisible}
            notices={this.withDimOrNotWithDim()}
          />
        </div>
        <MainMap />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
