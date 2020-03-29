import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/notice.css";
import NoticePreviewUser from "../Home/NoticePreviewUser";

const mapStateToProps = state => ({
  noticeWidth: state.notices.noticeWidth
});

const mapDispatchToProps = dispatch => ({});

const NoticeChild = props => {
  const notice = props.notice;
  return (
    <div style={{border: "1px solid black", display: "inline-block"}}>
      <Link to={`notice/${notice.slug}`}>
        <div>
          <div>
            <h3 style={{ color: "black", textAlign: "center" }}>{notice.title}</h3>
          </div>
          <span style={{ color: "black", textAlign: "center" }}>{notice.body}</span>
        </div>
      </Link>
      <div>
        <NoticePreviewUser notice={notice} />
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NoticeChild);
