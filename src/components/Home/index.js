import Banner from "./Banner";
import MainView from "./MainView";
import MapNavBar from "./MapNavBar";
import MainMap from "./MainMap";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

class Home extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Notices.all());
  }

  render() {
    return (
      <div className="home-page" style={{padding:"0px"}}>
        <Banner appName={this.props.appName} />
        <MapNavBar />
        <div className="container page">
          <div className="main-map">
            <MainMap />
          </div>
          <div className="row">
            <MainView />
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
