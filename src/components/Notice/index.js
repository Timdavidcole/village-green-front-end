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

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload })
});

class Notice extends React.Component {
  componentWillMount() {
    this.props.addNoticesWindowDims({
      width: document.body.clientWidth,
      height: document.body.clientHeight
    });
    this.props.onLoad(
      Promise.all([
        agent.Notices.get(this.props.match.params.id),
        agent.Comments.forNotice(this.props.match.params.id)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  noticeImage() {
    return this.props.notice.image ? (
      <img
        className="notice-image"
        alt="notice-image"
        src={this.props.notice.image}
      ></img>
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
      <div className="notice-page">
        <div className="notice-container">
          <div className="notice-details">
            <div className="notice-banner">
              <div className="notice-title-container">
                <h1>{this.props.notice.title}</h1>
              </div>
            </div>

            <div className="notice-body-container">
              <div className="notice-body">
                {this.props.notice.body.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </div>
            </div>
            <NoticeMeta notice={this.props.notice} canModify={canModify} />
          </div>
          {this.noticeImage()}
        </div>

        <CommentContainer
          comments={this.props.comments || []}
          errors={this.props.commentErrors}
          slug={this.props.match.params.id}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
