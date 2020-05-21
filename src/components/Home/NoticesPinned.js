import NoticePreviewText from "./NoticePreviewText";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  noticesPinned: state.pinned.notices,
  noticeWidth: state.notices.noticeWidth
});

const mapDispatchToProps = () => ({});

class NoticesPinned extends React.Component {
  render() {
    if (this.props.noticesPinned[0]) {
      return (
        <div
          style={{
            boxSizing: "border-box",
            height: `calc(100vh - 55px)`,
            width: "auto",
            margin: "0",
            padding: "20px",
            border: "none",
            overflow: "auto"
          }}
        >
          {this.props.noticesPinned.map((notice, i) => {
            if (!notice.image) {
              return (
                <NoticePreviewText
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
    } else return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPinned);
