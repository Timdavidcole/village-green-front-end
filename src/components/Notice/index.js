import NoticeContainerEdit from "./NoticeContainerEdit";
import NoticeContainer from "./NoticeContainer";
import CommentContainer from "./CommentContainer";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/notice.css";
import ChildNew from "./ChildNew";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser,
  editNotice: state.notice.editNotice
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
        agent.Notices.childNotices(this.props.match.params.id)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    console.log(this.props.editNotice);
    if (!this.props.notice) {
      return null;
    }
    return (
      <div className="notice-page">
        {this.props.editNotice ? <NoticeContainerEdit /> : <NoticeContainer />}
        <ChildNew />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
