import NoticesPinned from "./Home/NoticesPinned";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  profile: state.profile,
  notices: state.pinned.notices,
  noticesVisible: state.notices.noticesVisible,
  loggedIn: state.auth.loggedIn
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

  render() {
    const profile = this.props.currentUser;
    if (!profile) {
      return null;
    }

    return (
      <div>
        <NoticesPinned
          noticesVisible={this.props.noticesVisible}
          page={"pinned"}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pinned);
