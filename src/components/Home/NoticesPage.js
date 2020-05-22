import NoticePreviewText from "./NoticePreviewText";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  noticeWidth: state.notices.noticeWidth,
  notices: state.notices.notices,
  page: state.notices.page,
  sorted: state.notices.sorted,
  resize: state.notices.resize,
  noticesVisible: state.notices.noticesVisible,
  windowDims: state.notices.windowDims,
  noticesSorted: state.notices.noticesSorted,
  noticesY: state.notices.noticesY,
});

const mapDispatchToProps = (dispatch) => ({
});

class NoticesPage extends React.Component {
  constructor() {
    super();

    this.renderColumns = this.renderColumns.bind(this);
    this.renderNotices = this.renderNotices.bind(this);
  }

  renderColumns(column, index) {
    return (
      <div
        style={{ margin: "auto", width: `${this.props.noticeWidth}px` }}
        key={index}
      >
        {column.map(this.renderNotices)}
      </div>
    );
  }

  renderNotices(notice, i) {
    if (!notice.image) {
      return (
        <NoticePreviewText
          page={this.props.page}
          noticesVisible={this.props.noticesVisible}
          index={i + 2}
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
          index={i + 2}
          indexTrue={i}
          notice={notice}
          key={notice.slug}
        />
      );
    }
  }

  flexStyle() {
    return this.props.sorted ? { display: "flex" } : { display: "block" };
  }

  render() {
    return (
      <div
        className="noticesParent"
        id="notices"
        ref={this.myRef}
        style={this.flexStyle()}
      >
        {this.props.sorted
          ? this.props.noticesSorted.map(this.renderColumns)
          : this.props.notices.map(this.renderNotices)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
