import React from "react";

const NoticePreview = props => {
  const notice = props.notice;

  return (
    <div className="notice-preview">
      <div className="notice-meta">
        <a>
          <img src={notice.author.image} />
        </a>

        <div className="info">
          <a className="author">{notice.author.username}</a>
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

      <a to={`notice/${notice.slug}`} className="preview-link">
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
      </a>
    </div>
  );
};

export default NoticePreview;
