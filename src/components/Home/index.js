import MapNavBar from "./MapNavBar";
import MainMap from "./MainMap";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import Notices from "./Notices";

const mapStateToProps = (state) => ({
  noticesVisible: state.notices.noticesVisible,
  centerMap: state.map.centerMap,
  ...state.notices
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

class Home extends React.Component {

  componentDidMount() {
    this.props.onLoad(agent.Notices.all(JSON.stringify(this.props.centerMap)));
  }

  render() {
    
    return (
      <div style={{ width: "100%", height: "94vh" }}>
        <div style={{ width: "100%", position: "absolute" }}>
          <MapNavBar />
          <Notices noticesVisible={this.props.noticesVisible} notices={this.props.notices || []} />
        </div>
        <MainMap />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
