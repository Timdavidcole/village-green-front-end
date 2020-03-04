import NoticePreview from "./NoticePreview";
import React from "react";
import NewNotice from "./NewNotice";
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
      <div className="parent">
        <NewNotice noticesVisible={this.props.noticesVisible} />
        {this.props.notices.map((notice, i) => {
          return (
            <NoticePreview
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
