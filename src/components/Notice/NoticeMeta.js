import NoticeActions from "./NoticeActions";
import { Link } from "react-router-dom";
import React from "react";

const NoticeMeta = props => {
  const notice = props.notice;
  return (
    <div className="article-meta">
      <Link to={`@${notice.author.username}`}>
        <img alt="author" src={notice.author.image} />
      </Link>

      <div className="info">
        <Link to={`@${notice.author.username}`} className="author">
          {notice.author.username}
        </Link>
        <span className="date">
          {new Date(notice.createdAt).toDateString()}
        </span>
      </div>

      <NoticeActions canModify={props.canModify} notice={notice} />
    </div>
  );
};

export default NoticeMeta;
