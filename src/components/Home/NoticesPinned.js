import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "./noticesGrid.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  noticesPinned: state.pinned.notices
});

const mapDispatchToProps = () => ({
});

class NoticesPinned extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: false
    };
  }

  render() {
    if (!this.props.noticesPinned) {
      return [];
    }
    return (
      <div
        style={{
          height: "calc(100vh - 250px)",
          width: "auto",
          margin: "0",
          padding: "0",
          border: "none",
          overflow: "auto"
        }}
      >
        {this.props.noticesPinned.map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 1}
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
                index={i + 1}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPinned);
