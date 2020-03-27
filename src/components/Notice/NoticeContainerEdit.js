import NoticeMeta from "./NoticeMeta";
import CommentContainer from "./CommentContainer";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/notice.css";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({});

class NoticeContainerEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      body: '',
      image: ''
    }
  }

  componentDidMount( ) {
    this.setState({
      title: this.props.notice.title,
      description: this.props.notice.description,
      body: this.props.notice.body,
      image: this.props.notice.image
    })
  }
  noticeImage() {
    return this.props.notice.image ? (
      <div className="notice-image-container">
        <img className="notice-image" src={this.props.notice.image}></img>
      </div>
    ) : null;
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
          <form style={{ position: "relative" }} onSubmit={this.createNotice}>
            <fieldset className="new-notice-form">
              <input
                className="notice-banner"
                type="title"
                id="title"
                maxLength="50"
                style={{ textAlign: "center" }}
                value={this.state.title}
                onChange={this.setTitle}
              />
              <input
                className="notice-description"
                type="description"
                maxLength="75"
                style={{ textAlign: "center" }}
                value={this.state.description}
                onChange={this.setDescription}
              />
              <textarea
                className="notice-body"
                rows="4"
                maxLength="240"
                type="body"
                value={this.state.body}
                onChange={this.setBody}
              />
              <input
                className="notice-description"
                type="description"
                placeholder="enter optional image url here"
                value={this.state.image}
                onChange={this.setImage}
                style={{ marginBottom: "85px" }}
              />
              <button
                className="post-button"
                type="submit"
                disabled={this.props.inProgress}
                onClick={this.props.hideNewNoticeWindow}
              >
                post!
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
