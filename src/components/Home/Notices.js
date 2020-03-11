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
  newNotice: state.notices.newNotice
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
      console.log("sort unsorted");
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.notices),
          this.props.noticesWindowDims,
          this.props.loggedIn,
          this.props.newNoticeArrange
        )
      );
      return;
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
      return this.props.noticesSorted;
    } else {
      return this.props.notices;
    }
    // return this.props.sorted ? [this.props.newNotice[0], ...this.props.noticesSorted] : this.props.notices;
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
    console.log("RENDER NOTICES");
    return (
      <div
        className="parent"
        id="notices"
        ref={el => {
          if (
            (el && !this.props.noticesWindowDims.height) ||
            (el && this.props.update)
          ) {
            console.log(!this.props.noticesWindowDims.height)
            console.log(this.props.update)
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
        {this.plainOrSortedNotices().map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexTrue={i}
                notice={notice}
                key={notice.slug}
              />
            );
          } else {
            return (
              <NoticePreviewImage
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexTrue={i}
                notice={notice}
                key={notice.slug}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
