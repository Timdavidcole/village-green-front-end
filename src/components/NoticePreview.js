import React from "react";
import { Link } from "react-router-dom";

const NoticePreview = props => {
  const notice = props.notice;

  return (
    <div style={{boxShadow: "3px 3px 8px #cfcfcf", borderRadius:"6px", margin: "10px", padding: "5px"}}>
      <div style={{width: "800px"}}>
        <div style={{margin: "4px", display: "inline-block", width: "40px", float: "left", overflow:"hidden"}}>
          <Link to={`@${notice.author.username}`}>
            <img style={{borderRadius:"6px", width: "40px", height: "40px", objectFit: "cover"}} src={notice.author.image} alt="author"/>
          </Link>
        </div>
        <div style={{float: "left"}}>
          <Link style={{display: "block"}} to={`@${notice.author.username}`}>
            {notice.author.username}
          </Link>
          <span style={{color: "grey", display: "block"}}>
            {new Date(notice.createdAt).toDateString()}
          </span>
        </div>

        <div>
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
