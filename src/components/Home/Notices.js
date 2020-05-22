import React from "react";
import NoticesPage from "./NoticesPage";
import "../../styles/notices.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";

const mapStateToProps = (state) => ({
  windowDims: state.notices.windowDims,
  notices: state.notices.notices,
  sorted: state.notices.sorted,
  updatedUnsorted: state.notices.updatedUnsorted,
  waitTillDimUpdate: state.notices.waitTillDimUpdate,
  newNotice: state.notices.newNotice,
  sortDelete: state.notices.sortDelete,
  noticesSorted: state.notices.noticesSorted,
  pageNumber: state.notices.pageNumber,
  pageNumberChanged: state.notices.pageNumberChanged,
  noticeWidth: state.notices.noticeWidth,
});

const mapDispatchToProps = (dispatch) => ({
  updateSortedNotices: (payload) =>
    dispatch({ type: "UPDATE_SORTED_NOTICES", payload }),
});

class Notices extends React.Component {
  componentDidUpdate() {
    if (
      (this.checkNoticesDimensions() &&
        !this.props.sorted &&
        this.props.windowDims.height &&
        !this.props.waitTillDimUpdate) ||
      this.props.pageNumberChanged
    ) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight([...this.props.notices]),
          this.props.windowDims,
          this.props.newNotice,
          this.props.noticeWidth
        )
      );
    }
    if (this.props.updatedUnsorted && this.checkNoticesDimensions()) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight([...this.props.notices], this.props.newNotice),
          this.props.windowDims,
          this.props.newNotice,
          this.props.noticeWidth
        )
      );
    }
    if (this.props.sortDelete && this.checkNoticesDimensions()) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight([
            ...this.props.noticesSorted[this.props.pageNumber - 1],
          ]),
          this.props.windowDims,
          this.props.newNotice,
          this.props.noticeWidth
        )
      );
    }
  }

  checkNoticesDimensions() {
    var allDimsUpdated = true;
    this.props.notices.forEach((notice) => {
      if (!notice.height || !notice.width) {
        allDimsUpdated = false;
      }
    });
    return allDimsUpdated;
  }

  render() {
    if (this.props.notices.length === 0) {
      return null;
    } else return <NoticesPage />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
