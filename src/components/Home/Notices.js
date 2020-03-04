import NoticePreview from "./NoticePreview";
import React from "react";
import NewNotice from "./NewNotice";
import "./noticesGrid.css";
import { Transition } from "react-transition-group";

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

  const duration = 1000;

  const defaultStyle = {
    transition: `opacity 1s linear`,
    opacity: 0
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };

  return (
    <Transition in={props.noticesVisible} timeout={duration}>
      {state => (
        <div className="parent"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <NewNotice />
          {props.notices.map((notice, i) => {
            return (
              <NoticePreview index={i + 2} notice={notice} key={notice.slug} />
            );
          })}
        </div>
      )}
    </Transition>
  );
};

export default Notices;
