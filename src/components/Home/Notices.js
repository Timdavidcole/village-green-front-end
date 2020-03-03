import NoticePreview from "./NoticePreview";
import React from "react";
import NewNotice from "./NewNotice";
import "./noticesGrid.css";

const Notices = props => {
  if (!props.notices) {
    return (
      <div className="parent">
        <NewNotice />
        <div className="article-preview">Loading...</div>
      </div>
    );
  }

  if (props.notices.length === 0) {
    return (
      <div className="parent">
        <NewNotice />
        <div className="article-preview">No notices are here... yet.</div>
      </div>
    );
  }
  return (
    <div
      style={{ 
        visibility: props.noticesVisible,
        opacity: props.noticesVisible ? '1' : '0',
        transition: "visibility 0.2s ease-in-out, opacity 0.2s ease-in-out"
      }}
      className="parent"
    >
      <NewNotice />
      {props.notices.map((notice, i) => {
        return (
          <NoticePreview index={i + 2} notice={notice} key={notice.slug} />
        );
      })}
    </div>
  );
};

export default Notices;
