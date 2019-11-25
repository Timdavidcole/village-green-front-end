import React from "react";
import { Link } from "react-router-dom";

const NoticePreview = props => {
  const notice = props.notice;
  return (
    <div
      style={{
        width: "450px",
        position: "absolute",
        boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
        borderRadius: "6px",
        margin: "20px",
        padding: "10px",
        top: "100px",
        zIndex: "50",
        backgroundColor: "white",
      }}
    >
      <div>
        <div
          style={{
            margin: "4px",
            display: "inline-block",
            width: "40px",
            float: "right",
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
        <div style={{ float: "right" }}>
          <Link style={{ display: "block" }} to={`@${notice.author.username}`}>
            {notice.author.username}
          </Link>
          <span style={{ color: "grey", display: "block" }}>
            {new Date(notice.createdAt).toDateString()}
          </span>
        </div>
      </div>

      <Link to={`notice/${notice.slug}`}>
        <h3>{notice.title}</h3>
        <h5>{notice.description}</h5>
        <span>{notice.body}</span>
      </Link>
      <div
        style={{ position: "fixed", bottom: "0", right: "0", margin: "10px" }}
      >
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i> {notice.favoritesCount}
        </button>
      </div>
    </div>
  );
};

export default NoticePreview;
