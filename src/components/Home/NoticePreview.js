import React from "react";
import { Link } from "react-router-dom";
import "../../styles/noticePreview.css";

const NoticePreview = props => {
  const notice = props.notice;
  return (
    <div
      className={`div${props.index}`}
      style={{
        boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
        borderRadius: "6px",
        margin: "10px",
        padding: "10px",
        zIndex: "49",
        backgroundColor: "white",
        position: "relative"
      }}
    >
      <Link
        style={{
          width: "100%"
        }}
        to={`notice/${notice.slug}`}
      >
        <div style={{ borderBottom: "1px dashed red" }}>
          {" "}
          <h3>{notice.title}</h3>
        </div>
        <h5>{notice.description}</h5>
        <span>{notice.body}</span>
      </Link>
      <div
        style={{
          marginRight: "5px"
        }}
      >
        <div
          style={{
            margin: "4px",
            overflow: "hidden"
          }}
        >
          <Link to={`@${notice.author.username}`}>
            <img
              style={{
                borderRadius: "6px",
                width: "40px",
                height: "40px",
                objectFit: "cover"
              }}
              src={notice.author.image}
              alt="author"
            />
          </Link>
        </div>
        <div>
          <Link to={`@${notice.author.username}`}>
            {notice.author.username}
          </Link>
        </div>
      </div>
      <div className="thumb-buttons-container">
        <button className="thumbs-up-button">
          <i className="thumbs-up-icon"></i>
        </button>
        <button className="thumbs-down-button">
          <i className="thumbs-down-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default NoticePreview;
