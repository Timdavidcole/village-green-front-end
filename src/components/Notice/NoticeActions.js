import { Link } from "react-router-dom";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: "DELETE_NOTICE", payload })
});

const NoticeActions = props => {
  const notice = props.notice;
  const del = () => {
    props.onClickDelete(agent.Notices.del(notice.slug));
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

export default connect(
  () => ({}),
  mapDispatchToProps
)(NoticeActions);
