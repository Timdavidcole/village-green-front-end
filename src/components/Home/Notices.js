import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "./noticesGrid.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";

const mapStateToProps = state => ({
  noticesWindowHeight: state.notices.noticesWindowHeight
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowHeight: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_HEIGHT", payload })
});

class Notices extends React.Component {
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
          zIndex: "1",
          height: "calc(100vh - 117px)",
          width: "auto",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap"
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
        {(this.props.noticesWindowHeight
          ? sortByColumn(
              sortByHeight(this.props.notices),
              this.props.noticesWindowHeight
            )
          : this.props.notices
        ).map((notice, i) => {
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
