import React from "react";
import NoticesPage from "./NoticesPage";
import "../../styles/noticesGrid.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";

const mapStateToProps = state => ({
  noticesWindowDims: state.notices.noticesWindowDims,
  notices: state.notices.notices,
  noticesVisible: state.notices.noticesVisible,
  sorted: state.notices.sorted,
  loggedIn: state.auth.loggedIn,
  updatedUnsorted: state.notices.updatedUnsorted,
  noticesSorted: state.notices.noticesSorted,
  waitTillDimUpdate: state.notices.waitTillDimUpdate,
  newNotice: state.notices.newNotice,
  resize: state.notices.resize,
  sortDelete: state.notices.sortDelete,
  pageNumber: state.notices.pageNumber,
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
          sortByHeight([...this.props.notices]),
          this.props.noticesWindowDims,
          this.props.loggedIn,
          this.props.newNotice
        )
      );
    }
    if (this.props.updatedUnsorted && this.checkNoticesDimensions()) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight([...this.props.notices], this.props.newNotice),
          this.props.noticesWindowDims,
          this.props.loggedIn,
          this.props.newNotice
        )
      );
    }
    if (this.props.sortDelete && this.checkNoticesDimensions()) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight([...this.props.noticesSorted]),
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

  render() {
    if (this.props.notices.length === 0) {
      return (
        <div id="notices" className="parent">
          <div className="article-preview">No notices are here... yet.</div>
        </div>
      );
    }

    if (this.props.sorted) {
      console.log('return Notices Sorted')
      console.log(this.props.noticesSorted)
      console.log(this.props.pageNumber)
      return (
        <NoticesPage
          noticesByPage={this.props.noticesSorted[this.props.pageNumber - 1]}
        />
      );
    }

    if (!this.props.sorted) {
      return <NoticesPage noticesByPage={this.props.notices} />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
