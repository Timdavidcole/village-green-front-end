import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "./noticesGrid.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";
import moveLastNotice from "../../models/moveLastNotice";

const mapStateToProps = state => ({
  noticesWindowHeight: state.notices.noticesWindowHeight,
  noticesWindowWidth: state.notices.noticesWindowWidth,
  noticesCount: state.notices.noticesCount,
  notices: state.notices.notices,
  noticesWithDim: state.notices.noticesWithDim,
  noticesVisible: state.notices.noticesVisible,
  sorted: state.notices.sorted,
  loggedIn: state.auth.loggedIn,
  updatedUnsorted: state.notices.updatedUnsorted
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowHeight: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_HEIGHT", payload }),
  updateSortedNotices: payload =>
    dispatch({ type: "UPDATE_SORTED_NOTICES", payload }),
  moveLastNotice: payload => dispatch({ type: "MOVE_LAST_NOTICE", payload })
});

class NoticesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: false
    };
  }

  componentDidMount() {
    var doit;
    window.addEventListener("resize", () => {
      clearTimeout(doit);
      doit = setTimeout(() => {
        this.setState({ resize: !this.state.resize });
      }, 400);
    });
  }

  withDimOrNotWithDim() {
    console.log(this.props.sorted);
    console.log(this.props.notices[this.props.indexPage]);
    console.log(this.props.noticesWithDim[this.props.indexPage]);
    return this.props.sorted
      ? this.props.noticesWithDim[this.props.indexPage]
      : this.props.notices[this.props.indexPage];
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.noticesWithDim.length === this.props.notices.length) {
      return true;
    }
    if (nextProps.sorted) {
      return true;
    }
    if (
      nextProps.updatedUnsorted &&
      this.props.noticesWithDim.length === this.props.notices.length
    ) {
      return true;
    }
    return false;
  }

  isOverflown(element) {
    return element.scrollWidth > element.clientWidth + 5;
  }

  componentDidUpdate() {
    if (
      !this.props.sorted &&
      this.props.noticesWithDim[this.props.indexPage].length ===
        this.props.notices[this.props.indexPage].length &&
      this.props.notices[this.props.indexPage].length !== 0
    ) {
      var newNoticesWithDim = [...this.props.noticesWithDim];
      newNoticesWithDim[this.props.indexPage] = sortByColumn(
        sortByHeight(this.props.noticesWithDim),
        this.props.noticesWindowHeight,
        this.props.loggedIn
      );
      this.props.updateSortedNotices(newNoticesWithDim);
    }
  }

  render() {
    if (!this.props.notices) {
      return (
        <div className="parent">
          <div className="article-preview">Loading...</div>
        </div>
      );
    }

    if (this.props.notices.length === 0) {
      return (
        <div className="parent">
          <div className="article-preview">No notices are here... yet.</div>
        </div>
      );
    }
    return (
      <div
        style={{
          height: "calc(100vh - 114px)",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          margin: "10px",
          padding: "0",
          border: "none",
          overflowX: "hidden",
          overflowY: "hidden",
          opacity: this.props.sorted ? "1" : "0"
        }}
        ref={el => {
          if (
            (el && !this.props.noticesWindowHeight) ||
            (el && this.props.noticesWindowHeight !== el.offsetHeight)
          ) {
            this.props.addNoticesWindowHeight({
              width: el.offsetWidth,
              height: el.offsetHeight
            });
          }
          if (el) {
            if (this.isOverflown(el) && this.props.sorted) {
              this.props.moveLastNotice(
                moveLastNotice(this.props.noticesWithDim, this.props.index)
              );
            }
          }
        }}
      >
        {this.props.loggedIn ? (
          <NewNoticeButton noticesVisible={this.props.noticesVisible} />
        ) : null}
        {this.withDimOrNotWithDim().map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexPage={this.props.indexPage}
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
                indexPage={this.props.indexPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
