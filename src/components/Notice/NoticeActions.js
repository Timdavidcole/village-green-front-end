import { Link } from "react-router-dom";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow,
  centerMap: state.map.centerMap
});

const mapDispatchToProps = dispatch => ({
  onClickDelete: () => dispatch({ type: "DELETE_NOTICE" }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload })
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
      .then(() => props.onClickDelete());
  };
  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${notice.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit"></i> Edit Notice
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Notice
        </button>
      </span>
    );
  }

  return <span></span>;
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeActions);
