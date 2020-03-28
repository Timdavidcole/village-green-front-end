import NoticeMeta from "./NoticeMeta";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/notice.css";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  editNotice: payload => dispatch({ type: "EDIT_NOTICE", payload })
});

class NoticeContainerEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      image: ""
    };
    this.editNotice = this.editNotice.bind(this)
  }

  componentDidMount() {
    this.setState({
      title: this.props.notice.title,
      description: this.props.notice.description,
      body: this.props.notice.body,
      image: this.props.notice.image
    });
  }
  noticeImage() {
    return this.props.notice.image ? (
      <div className="notice-image-container">
        <img className="notice-image" src={this.state.image}></img>
      </div>
    ) : null;
  }

  componentDidUpdate() {
    document.getElementById('edit-body').focus()
  }

  editNotice(ev) {
    ev.preventDefault();
    console.log(this.props.notice.slug)
    agent.Notices.edit(this.props.notice.slug, {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
      image: this.state.image
    }).then(notice => {
      this.props.editNotice(notice);
    });
  }

  render() {
    if (!this.props.notice) {
      return null;
    }
    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.notice.author.username;
    return (
      <div className="notice-container">
        <div className="notice-details">
          <form style={{ position: "relative" }} onSubmit={this.editNotice}>
            <fieldset className="edit-notice-form">
              <input
                className="edit-banner"
                type="text"
                id="title"
                maxLength="50"
                style={{ textAlign: "center" }}
                value={this.state.title}
                onChange={ev => {
                  this.setState({ title: ev.target.value });
                }}
              />
              <input
                className="edit-description"
                type="text"
                maxLength="75"
                style={{ textAlign: "center" }}
                value={this.state.description}
                onChange={ev => {
                  this.setState({ description: ev.target.value });
                }}
              />
              <textarea
                className="edit-body"
                id="edit-body"
                rows="4"
                maxLength="240"
                type="text"
                autofocus="autofocus"
                value={this.state.body}
                onChange={ev => {
                  this.setState({ body: ev.target.value });
                }}
              />
              <input
                className="edit-image"
                type="text"
                placeholder="enter optional image url here"
                value={this.state.image}
                onChange={ev => {
                  this.setState({ image: ev.target.value });
                }}
              />
              <button
                className="post-edit-button"
                type="submit"
                disabled={this.props.inProgress}
                onClick={this.props.hideNewNoticeWindow}
              >
                confirm
              </button>
            </fieldset>
          </form>
          <NoticeMeta notice={this.props.notice} canModify={canModify} />
        </div>
        {this.noticeImage()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeContainerEdit);
