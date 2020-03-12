import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "../../styles/noticesGrid.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";

const mapStateToProps = state => ({
  noticesWindowDims: state.notices.noticesWindowDims,
  noticesCount: state.notices.noticesCount,
  notices: state.notices.notices,
  noticesVisible: state.notices.noticesVisible,
  sorted: state.notices.sorted,
  loggedIn: state.auth.loggedIn,
  updatedUnsorted: state.notices.updatedUnsorted,
  update: state.notices.update,
  noticesSorted: state.notices.noticesSorted,
  waitTillDimUpdate: state.notices.waitTillDimUpdate,
  newNoticeArrange: state.notices.newNoticeArrange,
  newNotice: state.notices.newNotice,
  resize: state.notices.resize,
  sortDelete: state.notices.sortDelete
});

const mapDispatchToProps = dispatch => ({
  newNoticeDisplayed: () => dispatch({ type: "NEW_NOTICE_DISPLAYED" }),
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload }),
  updateSortedNotices: payload =>
    dispatch({ type: "UPDATE_SORTED_NOTICES", payload })
});

class Notices extends React.Component {
  componentDidUpdate() {
    if (
      this.checkNoticesDimensions() &&
      !this.props.sorted &&
      this.props.noticesWindowDims.height &&
      !this.props.waitTillDimUpdate
    ) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.notices),
          this.props.noticesWindowDims,
          this.props.loggedIn,
          this.props.newNotice
        )
      );
    }
    if (this.props.updatedUnsorted) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.notices),
          this.props.noticesWindowDims,
          this.props.loggedIn,
          this.props.newNotice
        )
      );
    }
    if (this.props.sortDelete) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.noticesSorted),
          this.props.noticesWindowDims,
          this.props.loggedIn,
          this.props.newNotice
        )
      );
    }
  }

  checkNoticesDimensions() {
    var allDimsUpdated = true;
    this.props.notices.forEach(notice => {
      if (!notice.height || !notice.width) {
        allDimsUpdated = false;
      }
    });
    return allDimsUpdated;
  }

  plainOrSortedNotices() {
    if (this.props.sorted) {
      console.log("NOTICES SORTED ");
      return this.props.noticesSorted;
    } else {
      console.log("NOTICES UNSORTED ");

      return this.props.notices;
    }
  }

  render() {
    if (!this.props.notices) {
      return (
        <div id="notices" className="parent">
          <div className="article-preview">Loading...</div>
        </div>
      );
    }

    if (this.props.notices.length === 0) {
      return (
        <div id="notices" className="parent">
          <div className="article-preview">No notices are here... yet.</div>
        </div>
      );
    }
    return (
      <div
        className="parent"
        id="notices"
        ref={el => {
          if (
            (el && !this.props.noticesWindowDims.height) ||
            this.props.resize
          ) {
            this.props.addNoticesWindowDims({
              width: document.getElementById("notices").offsetWidth,
              height: document.getElementById("notices").offsetHeight
            });
          }
        }}
      >
        {this.props.loggedIn ? (
          <NewNoticeButton noticesVisible={this.props.noticesVisible} />
        ) : null}
        {this.plainOrSortedNotices().map((notice1, i) => {
          console.log(i);
          if (!notice1.image) {
            console.log(notice1)
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexTrue={i}
                notice1={notice1}
                key={notice1.slug}
              />
            );
          } else {
            console.log(notice1)
            return (
              <NoticePreviewImage
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
