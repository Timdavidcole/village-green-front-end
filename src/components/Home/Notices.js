import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "./noticesGrid.css";

class Notices extends React.Component {
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
          width: "100vw",
          overflow: "scroll"
        }}
      >
        <NewNoticeButton noticesVisible={this.props.noticesVisible} />
        {this.props.notices.map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + (this.props.page === "pinned" ? 1 : 2)}
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

export default Notices;
