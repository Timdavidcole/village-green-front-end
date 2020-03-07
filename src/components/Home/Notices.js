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

    if (this.props.page === "pinned") {
      return (
        <div
          className="parent"
          style={{
            zIndex: "1",
            height: "auto",
            width: "auto"
          }}
        >
          {this.props.notices.map((notice, i) => {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 1}
                notice={notice}
                key={notice.slug}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div
        className="parent"
        style={{
          zIndex: "1",
          height: "calc(100vh - 130px)",
          width: "100vw"
        }}
      >
        <NewNoticeButton noticesVisible={this.props.noticesVisible} />
        {this.props.notices.map((notice, i) => {
                    console.log(notice.title);
          console.log(notice.image);
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
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
