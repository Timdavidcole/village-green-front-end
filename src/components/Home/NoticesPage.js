import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import PageScroll from "./PageScroll";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";
import ChangePageButton from "./ChangePageButton";

const mapStateToProps = (state) => ({
  page: state.notices.page,
  resize: state.notices.resize,
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible,
  noticesWindowDims: state.notices.noticesWindowDims,
  noticesSorted: state.notices.noticesSorted,
  noticesY: state.notices.noticesY,
});

const mapDispatchToProps = (dispatch) => ({
  addNoticesWindowDims: (payload) =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload }),
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
        height: windowHeight,
      });
    }
  }

  render() {
    if(this.props.noticesSorted){
      const noticesSorted = this.props.noticesSorted
      console.log(noticesSorted)
    }
    return (
      <div>
        <div
          className="noticesParent"
          id="notices"
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
