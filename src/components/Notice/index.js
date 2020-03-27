import NoticeContainerEdit from "./NoticeContainerEdit";
import NoticeContainer from "./NoticeContainer";
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
      <div className="notice-image-container">
        <img className="notice-image" src={this.props.notice.image}></img>
      </div>
    ) : null;
  }

  render() {
    if (!this.props.notice) {
      return null;
    }
    return (
      <div className="notice-page">
        {this.props.notice.editNotice ? <NoticeContainerEdit /> : <NoticeContainer />}

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
