import React from "react";
import { Link } from "react-router-dom";

const NoticePreview = props => {
  const notice = props.notice;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`@${notice.author.username}`}>
          <img src={notice.author.image} alt="author"/>
        </Link>

        <div className="info">
          <Link className="author" to={`@${notice.author.username}`}>
            {notice.author.username}
          </Link>
          <span className="date">
            {new Date(notice.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i> {notice.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`notice/${notice.slug}`} className="preview-link">
        <h1>{notice.title}</h1>
        <p>{notice.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {notice.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

export default NoticePreview;
