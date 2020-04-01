import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";
import ChangePageButton from "./ChangePageButton";
import { Transition } from "react-transition-group";
import ReactDOM from "react-dom";

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
    dispatch({ type: "STOP_PAGE_NUMBER_ANIMATION" }),
  updatePageNumber: payload =>
    dispatch({ type: "UPDATE_PAGE_NUMBER", payload }),
  startPageNumberAnimation: payload =>
    dispatch({ type: "START_PAGE_NUMBER_ANIMATION", payload })
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

  componentDidMount() {
    const scrollThreshold = 80
    const throttle = (func, limit) => {
      let inThrottle = false;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle && (args[0].deltaY > scrollThreshold || args[0].deltaY < -scrollThreshold)) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };
    const noticesPage = ReactDOM.findDOMNode(this);
    noticesPage.addEventListener(
      "wheel",
      throttle(event => {
        if (
          (this.props.pageNumber > 1 && event.deltaY < 0) ||
          (this.props.pageNumber < this.props.noticesSorted.length &&
            event.deltaY > 0)
        ) {
          this.props.startPageNumberAnimation();
          this.props.updatePageNumber({
            direction: event.deltaY > 0 ? "up" : "down",
            pageNumber:
              event.deltaY > 0
                ? this.props.pageNumber + 1
                : this.props.pageNumber - 1
          });
        }
      }, 200),
      true
    );
  }

  stopPageNumberAnimation = () => {
    this.props.stopPageNumberAnimation();
  };

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
    const duration = 200;

    const transitionStyles = () => {
      if (this.props.pageChangeDirection === "up") {
        return {
          entering: { opacity: "0", transform: "translate(0px, -500px)" },
          entered: { opacity: "0", transform: "translate(0px, 500px)" },
          exiting: { opacity: "0", transform: "translate(0px, 500px)" },
          exited: { opacity: "1" }
        };
      } else
        return {
          entering: { opacity: "0", transform: "translate(0px, 500px)" },
          entered: { opacity: "0", transform: "translate(0px, -500px)" },
          exiting: { opacity: "0", transform: "translate(0px, -500px)" },
          exited: { opacity: "1" }
        };
    };

    if (!this.props.noticesByPage) {
      return null;
    }
    if (this.props.pageNumberAnimation) {
      setTimeout(this.stopPageNumberAnimation, duration);
    }
    return (
      <Transition
        in={this.props.pageNumberAnimation}
        out={!this.props.pageNumberAnimation}
        timeout={duration}
      >
        {state => (
          <div
            className="noticesSwipeAnimation"
            style={{
              pointerEvents: "none",
              ...transitionStyles()[state]
            }}
          >
            {this.whichPageNumberButton("up")}
            <div
              className="noticesParent"
              id="notices"
              style={this.checkPageStyle()}
              ref={el => {
                if (
                  (el && !this.props.noticesWindowDims.height) ||
                  this.props.resize ||
                  (el &&
                    this.props.noticesWindowDims.height !==
                      document.getElementById("notices").offsetHeight)
                ) {
                  this.props.addNoticesWindowDims({
                    width: document.getElementById("notices").offsetWidth,
                    height: document.getElementById("notices").offsetHeight
                  });
                }
              }}
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
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesPage);
