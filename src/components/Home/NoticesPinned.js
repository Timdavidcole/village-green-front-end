import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "./noticesGrid.css";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  notices: state.pinned.notices
});

const mapDispatchToProps = () => ({
});

class NoticesPinned extends React.Component {

  render() {
    console.log(this.props.notices)
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
          console.log(notice)
          if (!notice.image) {
            console.log('show Notice no image')
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
            console.log('show Notice image')
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
