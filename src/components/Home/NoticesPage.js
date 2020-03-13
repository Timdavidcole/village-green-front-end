import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "../../styles/noticesGrid.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  page: state.notices.page,
  resize: state.notices.resize,
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible,
  updatedUnsorted: state.notices.updatedUnsorted,
  noticesWindowDims: state.notices.noticesWindowDims
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload })
});

const NoticesPage = props => {
  if (!props.noticesByPage) {
    return (
      <div id="notices" className="parent">
        <div className="article-preview">Loading...</div>
      </div>
    );
  }
  console.log(props.noticesByPage)
  return (
    <div
      className="parent"
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
          console.log('NOTICE NORMAL')
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
          console.log('NOTICE IMAGE')
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
