import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/notice.css";
import NoticePreviewUser from "../Home/NoticePreviewUser";

const mapStateToProps = state => ({
  noticeWidth: state.notices.noticeWidth
});

const mapDispatchToProps = dispatch => ({
  viewNewNotice: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload })
});

const NoteText = props => {
  const notice = props.notice;
  return (
    <div className="note-container">
      <Link to={`${notice.slug}`}>
        <div>
          <div>
            <h3
              style={{
                color: "var(--noobo-darker-green)",
                textAlign: "center"
              }}
            >
              {notice.title}
            </h3>
          </div>
          <span
            style={{ color: "var(--noobo-darker-green)", textAlign: "center" }}
          >
            {notice.body}
          </span>
        </div>
      </Link>
      <div>
        <NoticePreviewUser notice={notice} />
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteText);
