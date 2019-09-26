"use strict";

import NoticePreview from "./NoticePreview";
import React from "react";

const Notices = props => {
  if (!props.notices) {
    return <div className="notice-preview">Loading...</div>;
  }

  if (props.notices.length === 0) {
    return <div className="notice-preview">No notices are here... yet.</div>;
  }

  return (
    <div>
      {props.notices.map(notice => {
        return <NoticePreview notice={notice} key={notice.slug} />;
      })}
    </div>
  );
};

export default Notices;
