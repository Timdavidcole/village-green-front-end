import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "../../styles/notices.css";
import { connect } from "react-redux";
import ChangePageButton from "./ChangePageButton";
import ChangePageDownButton from "./ChangePageDownButton";

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  page: state.notices.page,
  resize: state.notices.resize,
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible,
  updatedUnsorted: state.notices.updatedUnsorted,
  noticesWindowDims: state.notices.noticesWindowDims,
  pageNumber: state.notices.pageNumber,
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
    if (direction === "up") {
      if (pageNumber > 1) {
        return <ChangePageButton direction="up" />;
      }
    } else if (direction === "down") {
      if (pageNumber < noticesSorted.length) {
        return <ChangePageButton direction="down" />;
      }
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
    <div style={{pointerEvents: 'none'}}>
      {whichPageNumberButton("up")}
      <div
        className="noticesParent"
        id="notices"
        ref={el => {
          if ((el && !props.noticesWindowDims.height) || props.resize) {
            props.addNoticesWindowDims({
              width: document.getElementById("notices").offsetWidth,
              height: document.getElementById("notices").offsetHeight
            });
          }
        }}
      >
        {props.loggedIn ? (
          <NewNoticeButton noticesVisible={props.noticesVisible} />
        ) : null}
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
