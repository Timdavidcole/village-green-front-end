import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";
import ChangePageButton from "./ChangePageButton";

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  page: state.notices.page,
  resize: state.notices.resize,
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible,
  updatedUnsorted: state.notices.updatedUnsorted,
  noticesWindowDims: state.notices.noticesWindowDims,
  noticesSorted: state.notices.noticesSorted
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload })
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

  if (!props.noticesByPage) {
    return (
      <div id="notices">
        <div className="article-preview">Loading...</div>
      </div>
    );
  }
  return (
    <div style={{ pointerEvents: "none" }}>
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
