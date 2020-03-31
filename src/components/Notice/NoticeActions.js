import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow,
  centerMap: state.map.centerMap,
  noticesSorted: state.notices.noticesSorted,
  notice: state.notice.notice
});

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: "DELETE_NOTICE", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
  editNoticeToggle: () => dispatch({ type: "EDIT_NOTICE_TOGGLE" })
});

const NoticeActions = props => {
  const notice = props.notice;
  const del = () => {
    agent.Notices.del(notice.slug)
      .then(() => {
        props.updateUnsortedNotices(
          agent.Notices.all(JSON.stringify(props.centerMap))
        );
      })
      .then(() => props.onClickDelete(notice));
  };

  const edit = () => {
    props.editNoticeToggle();
  };

  if (props.canModify) {
    return (
      <div className="notice-actions">
        <button className="notice-edit-button" onClick={edit}>
          <i className="ion-edit"></i> Edit
        </button>
        <button className="notice-delete-button" onClick={del}>
          <i className="ion-trash-a"></i> Delete
        </button>
      </div>
    );
  }

  return <span></span>;
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeActions);
