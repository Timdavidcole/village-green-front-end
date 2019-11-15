import React from "react";
import { Link } from "react-router-dom";

const NoticePreview = props => {
  const notice = props.notice;

  return (
    <div style={{boxShadow: "5px 5px 5px #cfcfcf", borderRadius:"6px", margin: "10px"}}>
      <div style={{display: "inline-block"}}>
        <Link to={`@${notice.author.username}`}>
          <img style={{borderRadius:"6px", width: "30px", height: "30px", objectFit: "cover"}} src={notice.author.image} alt="author"/>
        </Link>

        <div style={{display: "block"}}>
          <Link className="author" to={`@${notice.author.username}`}>
            {notice.author.username}
          </Link>
          <span className="date">
            {new Date(notice.createdAt).toDateString()}
          </span>
        </div>

        <div style={{float: "right"}}>
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i> {notice.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`notice/${notice.slug}`} className="preview-link">
        <h3>{notice.title}</h3>
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
