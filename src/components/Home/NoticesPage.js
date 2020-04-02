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
  pageNumberAnimation: state.notices.pageNumberAnimation,
  noticesVisible: state.notices.noticesVisible,
  noticesWindowDims: state.notices.noticesWindowDims,
  noticesSorted: state.notices.noticesSorted,
  pageChangeDirection: state.notices.pageChangeDirection
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload }),
  stopPageNumberAnimation: () =>
    dispatch({ type: "STOP_PAGE_NUMBER_ANIMATION" })
});

class NoticesPage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

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

  checkPageStyle() {
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
        {this.myRef.current ? (
          <PageScroll element={this.myRef.current} />
        ) : null}
        {this.whichPageNumberButton("up")}
        <div
          className="noticesParent"
          id="notices"
          style={this.checkPageStyle()}
          ref={this.myRef}
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
