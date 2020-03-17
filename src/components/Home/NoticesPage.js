import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";
import ChangePageButton from "./ChangePageButton";
import Loader from "./Loader";
import { Transition } from "react-transition-group";

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  page: state.notices.page,
  resize: state.notices.resize,
  pageNumber: state.notices.pageNumber,
  pageNumberChanged: state.notices.pageNumberChanged,
  pageNumberAnimation: state.notices.pageNumberAnimation,
  noticesVisible: state.notices.noticesVisible,
  updatedUnsorted: state.notices.updatedUnsorted,
  noticesWindowDims: state.notices.noticesWindowDims,
  noticesSorted: state.notices.noticesSorted,
  loading: state.notices.loading,
  pageChangeDirection: state.notices.pageChangeDirection
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload }),
  stopPageNumberAnimation: () =>
    dispatch({ type: "STOP_PAGE_NUMBER_ANIMATION" })
});

const NoticesPage = props => {
  const whichPageNumberButton = function(direction) {
    const pageNumber = props.pageNumber;
    const noticesSorted = props.noticesSorted;
    if (pageNumber > 1 && direction === "up") {
      return <ChangePageButton direction="up" />;
    }
    if (pageNumber < noticesSorted.length && direction === "down") {
      return <ChangePageButton direction="down" />;
    }
  };

  const stopPageNumberAnimation = function() {
    props.stopPageNumberAnimation();
  };

  const checkPageStyle = function() {
    const pageNumber = props.pageNumber;
    const noticesSorted = props.noticesSorted;
    if (noticesSorted.length === 1) {
      return {
        height: "calc(100vh - 80px)"
      };
    }
    if (pageNumber === 1 && noticesSorted.length > 1) {
      return {
        height: "calc(100vh - 120px)"
      };
    } else if (pageNumber > 1 && pageNumber < noticesSorted.length) {
      return {
        height: "calc(100vh - 180px)"
      };
    } else if (
      pageNumber === noticesSorted.length &&
      noticesSorted.length > 1
    ) {
      return {
        height: "calc(100vh - 120px)"
      };
    }
  };

  const duration = 200;

  const transitionStyles = function() {
    if (props.pageChangeDirection === "up") {
      return {
        entering: { opacity: "0", transform: "translate(0px, -500px)" },
        entered: { opacity: "0", transform: "translate(0px, 500px)" },
        exiting: { opacity: "0", transform: "translate(0px, 500px)" },
        exited: { opacity: "1" }
      };
    } else
      return {
        entering: { opacity: "0", transform: "translate(0px, 500px)" },
        entered: { opacity: "0", transform: "translate(0px, -500px)" },
        exiting: { opacity: "0", transform: "translate(0px, -500px)" },
        exited: { opacity: "1" }
      };
  };

  if (!props.noticesByPage) {
    return (
      <div id="notices">
        <div className="article-preview">Loading...</div>
      </div>
    );
  }
  if (props.pageNumberAnimation) {
    setTimeout(stopPageNumberAnimation, duration);
  }
  return (
    <Transition
      in={props.pageNumberAnimation}
      out={!props.pageNumberAnimation}
      timeout={duration}
    >
      {state => (
        <div
          className="noticesSwipeAnimation"
          style={{
            pointerEvents: "none",
            ...transitionStyles()[state]
          }}
        >
          {props.loading ? <Loader /> : null}
          {whichPageNumberButton("up")}
          <div
            className="noticesParent"
            id="notices"
            style={checkPageStyle()}
            ref={el => {
              if (
                (el && !props.noticesWindowDims.height) ||
                props.resize ||
                (el &&
                  props.noticesWindowDims.height !==
                    document.getElementById("notices").offsetHeight)
              ) {
                props.addNoticesWindowDims({
                  width: document.getElementById("notices").offsetWidth,
                  height: document.getElementById("notices").offsetHeight
                });
              }
            }}
          >
            {props.noticesByPage.map((notice1, i) => {
              if (!notice1.image) {
                return (
                  <NoticePreview
                    page={props.page}
                    noticesVisible={props.noticesVisible}
                    index={i + 2}
                    indexTrue={i}
                    notice1={notice1}
                    key={notice1.slug}
                  />
                );
              } else {
                return (
                  <NoticePreviewImage
                    page={props.page}
                    noticesVisible={props.noticesVisible}
                    index={i + 2}
                    indexTrue={i}
                    notice1={notice1}
                    key={notice1.slug}
                  />
                );
              }
            })}
          </div>
          {whichPageNumberButton("down")}
        </div>
      )}
    </Transition>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
