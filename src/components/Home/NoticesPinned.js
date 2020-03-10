import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "../../styles/noticesGrid.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  notices: state.pinned.notices
});

const mapDispatchToProps = () => ({});

class NoticesPinned extends React.Component {
  render() {
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
        {this.props.notices.map((notice, i) => {
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
