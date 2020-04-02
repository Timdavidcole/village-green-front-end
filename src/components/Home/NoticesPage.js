import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import PageScroll from "./PageScroll";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";
import ChangePageButton from "./ChangePageButton";

const mapStateToProps = state => ({
  page: state.notices.page,
  resize: state.notices.resize,
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible,
  noticesWindowDims: state.notices.noticesWindowDims,
  noticesSorted: state.notices.noticesSorted,
  noticesY: state.notices.noticesY
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload })
});

class NoticesPage extends React.Component {
  whichPageNumberButton(direction) {
    const pageNumber = this.props.pageNumber;
    const noticesSorted = this.props.noticesSorted;
    if (pageNumber > 1 && direction === "up") {
      return <ChangePageButton direction="up" />;
    }
    if (pageNumber < noticesSorted.length && direction === "down") {
      return <ChangePageButton direction="down" />;
    }
  }

  addNewWindowDims() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    if (
      this.props.resize ||
      this.props.noticesWindowDims.height !== windowHeight ||
      this.props.noticesWindowDims.width !== windowWidth
    ) {
      this.props.addNoticesWindowDims({
        width: windowWidth,
        height: windowHeight
      });
    }
  }

  checkPageStyle() {
    const pageNumber = this.props.pageNumber;
    const noticesSorted = this.props.noticesSorted;
    if (noticesSorted.length === 1) {
      return {
        height: "calc(100vh - 105px)"
      };
    }
    if (pageNumber === 1 && noticesSorted.length > 1) {
      return {
        height: "calc(100vh - 150px)"
      };
    } else if (pageNumber > 1 && pageNumber < noticesSorted.length) {
      return {
        height: "calc(100vh - 185px)"
      };
    } else if (
      pageNumber === noticesSorted.length &&
      noticesSorted.length > 1
    ) {
      return {
        height: "calc(100vh - 140px)"
      };
    }
  }

  render() {
    return (
      <div>
        <PageScroll />
        {this.whichPageNumberButton("up")}
        <div
          className="noticesParent"
          id="notices"
          style={{
            transform: `translateY(${this.props.noticesY}px)`,
            ...this.checkPageStyle()
          }}
          ref={this.myRef}
          onLoad={this.addNewWindowDims()}
        >
          {this.props.noticesByPage.map((notice, i) => {
            if (!notice.image) {
              return (
                <NoticePreview
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
          })}
        </div>
        {this.whichPageNumberButton("down")}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
