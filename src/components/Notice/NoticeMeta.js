import NoticeActions from "./NoticeActions";
import { Link } from "react-router-dom";
import React from "react";

const NoticeMeta = props => {
  const notice = props.notice;
  return (
    <div className="notice-meta">
      <div className="notice-date">
        Posted: {new Date(notice.createdAt).toDateString()}
      </div>
      <div className="notice-author-container">
        <Link to={`@${notice.author.username}`}>
          <img
            className="notice-author-image"
            alt="author"
            src={notice.author.image}
          />
        </Link>

        <div className="notice-username">
          <Link
            className="notice-username-link"
            to={`@${notice.author.username}`}
          >
            {notice.author.username}
          </Link>
        </div>
      </div>
      <NoticeActions canModify={props.canModify} notice={notice} />
    </div>
  );
};

export default NoticeMeta;
