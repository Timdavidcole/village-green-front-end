import NoticePreview from "./NoticePreview";
import React from "react";
import NewNotice from "./NewNotice";
import "./noticesGrid.css";

class Notices extends React.Component {
  render() {
    console.log("render Notices");
    console.log(this.props.notices);

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
            zIndex: "5000"
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
          zIndex: "5000"
        }}
      >
        <NewNotice noticesVisible={this.props.noticesVisible} />
        {this.props.notices.map((notice, i) => {
          return (
            <NoticePreview
              page={this.props.page}
              noticesVisible={this.props.noticesVisible}
              index={i + 2}
              notice={notice}
              key={notice.slug}
            />
          );
        })}
      </div>
    );
  }
}

export default Notices;
