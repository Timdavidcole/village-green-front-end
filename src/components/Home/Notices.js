import NoticePreview from "./NoticePreview";
import React from "react";
import NewNotice from "./NewNotice";
import "./noticesGrid.css";

const Notices = props => {
  if (!props.notices) {
    return <div className="article-preview">Loading...</div>;
  }

  if (props.notices.length === 0) {
    return <div className="article-preview">No notices are here... yet.</div>;
  }

  return (
    <div class="parent">
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
