import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "./noticesGrid.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";

const mapStateToProps = state => ({
  noticesWindowHeight: state.notices.noticesWindowHeight,
  noticesCount: state.notices.noticesCount,
  notices: state.notices.notices,
  noticesWithDim: state.notices.noticesWithDim,
  noticesVisible: state.notices.noticesVisible,
  sorted: state.notices.sorted
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowHeight: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_HEIGHT", payload }),
  updateSortedNotices: payload =>
    dispatch({ type: "UPDATE_SORTED_NOTICES", payload }),
  updateSorted: () => dispatch({ type: "UPDATE_SORTED" })
});

class Notices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: false
    };
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      console.log("RESIZE");

      console.log(this.state.resize);
      this.setState({ resize: !this.state.resize });
      this.props.updateSorted();
    });
  }

  newNoticeButton() {
    if (this.props.page === "pinned") {
      return null;
    } else {
      return <NewNoticeButton noticesVisible={this.props.noticesVisible} />;
    }
  }

  addNoticesWindowHeight(height) {
    this.props.addNoticesWindowHeight(height);
  }

  withDimOrNotWithDim() {
    return this.props.sorted ? this.props.noticesWithDim : this.props.notices;
  }

  componentDidUpdate() {
    if (
      (this.props.noticesWindowHeight &&
        !this.props.sorted &&
        this.props.noticesCount === this.props.noticesWithDim.length) ||
      (this.state.resize && !this.props.sorted)
    ) {
      console.log("UPDATE SORTED NOTICES");
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.noticesWithDim),
          this.props.noticesWindowHeight
        )
      );
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
          width: "auto",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          margin: "0",
          padding: "0",
          border: "none",
          overflow: "hidden"
        }}
        ref={el => {
          if (
            (el && !this.props.noticesWindowHeight) ||
            (el && this.props.noticesWindowHeight !== el.offsetHeight)
          ) {
            this.addNoticesWindowHeight(el.offsetHeight);
          }
        }}
      >
        {this.newNoticeButton()}
        {this.withDimOrNotWithDim().map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + (this.props.page === "pinned" ? 1 : 2)}
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
                index={i + (this.props.page === "pinned" ? 1 : 2)}
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
