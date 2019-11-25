import MainView from "./MainView";
import MapNavBar from "./MapNavBar";
import MainMap from "./MainMap";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import Notices from "../Notices";

const mapStateToProps = state => ({
  ...state.notices,
  appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoad(agent.Notices.all());
  }

  render() {
    return (
      <div className="home-page" style={{ padding: "0px" }}>
        <div style={{ width: "100%"}}>
          <div className="main-map">
            <MapNavBar />
            <Notices notices={this.props.notices || []} />
            <MainMap />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
