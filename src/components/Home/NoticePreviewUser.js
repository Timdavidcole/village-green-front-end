import React from "react";
import { Link } from "react-router-dom";
import "../../styles/noticePreview.css";

const NoticePreviewUser = function(props) {
  const notice = props.notice;
  return (
    <div
      style={{
        display: "inline-block",
        marginTop: "5px"
      }}
    >
      <div
        style={{
          overflow: "hidden"
        }}
      >
        <Link to={`@${notice.author.username}`} style={{ color: "#4faa4f" }}>
          <img
            style={{
              borderRadius: "6px",
              width: "35px",
              height: "35px",
              objectFit: "cover",
              marginRight: "3px"
            }}
            src={notice.author.image}
            alt="author"
          />
          {notice.author.username}
        </Link>
      </div>
    </div>
  );
};

export default NoticePreviewUser;
