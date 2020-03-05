import Notices from "./Home/Notices";
import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.notices,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "PROFILE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "PROFILE_PAGE_UNLOADED" })
});

class Profile extends React.Component {
  componentWillMount() {
    console.log(this.props.match.params)
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Notices.byAuthor(this.props.match.params.username)
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
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser =
      this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} alt="user" className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">{this.renderTabs()}</div>

              <Notices notices={this.props.notices} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
export { Profile, mapStateToProps };
