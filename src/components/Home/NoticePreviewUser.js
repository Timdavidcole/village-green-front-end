import React from "react";
import { Link } from "react-router-dom";
import "../../styles/noticePreview.css";
import timeSince from "../../models/timeSince";

const NoticePreviewUser = function(props) {
  const notice = props.notice;
  return (
    <div className="notice-user-container">
      <Link
        id="notice-user"
        className="notice-user"
        to={`@${notice.author.username}`}
      >
        <img
          className="notice-user-image"
          src={notice.author.image}
          alt="author"
        />
        <span
          style={{
            display: "inline-block",
            position: "absolute",
            fontSize: "0.8rem"
          }}
        >
          {notice.author.username}
        </span>
        <span
          style={{
            display: "inline-block",
            position: "absolute",
            fontSize: "0.8rem",
            bottom: "5px"
          }}
        >
          {timeSince(new Date(notice.createdAt))} ago
        </span>
      </Link>
    </div>
  );
};

export default NoticePreviewUser;
