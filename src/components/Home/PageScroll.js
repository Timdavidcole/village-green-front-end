import throttle from "../../models/throttle";
import { connect } from "react-redux";
import React from "react";

const mapStateToProps = state => ({
  pageNumber: state.notices.pageNumber,
  noticesSorted: state.notices.noticesSorted
});

const mapDispatchToProps = dispatch => ({
  updatePageNumber: payload =>
    dispatch({ type: "UPDATE_PAGE_NUMBER", payload }),
  startPageNumberAnimation: payload =>
    dispatch({ type: "START_PAGE_NUMBER_ANIMATION", payload })
});

class PageScroll extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    document.addEventListener(
      "wheel",
      throttle(event => {
        if (
          (this.props.pageNumber > 1 && event.deltaY < 0) ||
          (this.props.pageNumber < this.props.noticesSorted.length &&
            event.deltaY > 0)
        ) {
          this.props.startPageNumberAnimation();
          setTimeout(
            () =>
              this.props.updatePageNumber({
                direction: event.deltaY < 0 ? "up" : "down",
                pageNumber:
                  event.deltaY > 0
                    ? this.props.pageNumber + 1
                    : this.props.pageNumber - 1
              }),
            200
          );
        }
      }, 800),
      true
    );

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageScroll);
