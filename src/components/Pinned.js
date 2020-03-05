import Notices from "./Home/Notices";
import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  profile: state.profile,
  notices: state.pinned.notices,
  noticesVisible: state.notices.noticesVisible
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "PINNED_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "PINNED_PAGE_UNLOADED" })
});

class Pinned extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Notices.pinned(this.props.match.params.username)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Notices notices={this.props.notices || []} />
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.currentUser;
    if (!profile) {
      return null;
    }

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} alt="user" className="user-img" />
                <h4>{profile.username}</h4>
              </div>
            </div>
          </div>
        </div>

        <Notices
          noticesVisible={this.props.noticesVisible}
          notices={this.props.notices}
          page={"pinned"}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pinned);
