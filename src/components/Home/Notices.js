import NoticePreview from "./NoticePreview";
import React from "react";
import NewNotice from "./NewNotice";
import "./noticesGrid.css";
import { Transition } from "react-transition-group";

const Notices = props => {
  if (!props.notices) {
    return (
      <div className="parent">
        <div className="article-preview">Loading...</div>
      </div>
    );
  }

  if (props.notices.length === 0) {
    return (
      <div className="parent">
        <div className="article-preview">No notices are here... yet.</div>
      </div>
    );
  }

  const duration = {
    appear: 1000,
    enter: 1000,
    exit: 1000,
   };

  const defaultStyle = {
    transition: `opacity 1s ease-in-out`,
    opacity: 1
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 0 },
    exiting: { opacity: 1 },
    exited: { opacity: 1 }
  };

  return (
    <Transition in={!props.noticesVisible} timeout={duration}>
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
