import throttle from "../../models/throttle";
import { connect } from "react-redux";
import React from "react";

const mapStateToProps = state => ({
  pageNumber: state.notices.pageNumber,
  noticesSorted: state.notices.noticesSorted,
  noticesY: state.notices.noticesY
});

const mapDispatchToProps = dispatch => ({
  updatePageNumber: payload =>
    dispatch({ type: "UPDATE_PAGE_NUMBER", payload }),
  startPageNumberAnimation: payload =>
    dispatch({ type: "START_PAGE_NUMBER_ANIMATION", payload }),
  changeNoticesY: payload => dispatch({ type: "CHANGE_NOTICES_Y", payload })
});

class PageScroll extends React.PureComponent {
  componentDidMount() {
    this.createPageTurnerScroll();
  }

  createPageTurnerScroll() {
    document.addEventListener(
      "wheel",
      throttle(event => {
        if (this.props.pageNumber === 1 && event.deltaY < 0) {
          return null;
        }
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
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageScroll);
