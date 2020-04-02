import throttle from "../../models/throttle";
import { connect } from "react-redux";

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

const PageScroll = props => {
  console.log(props.element)
  props.element.addEventListener(
    "wheel",
    throttle(function(event) {
      console.log(event.deltaY)
      console.log(props.pageNumber > 1 && event.deltaY < 0)
      console.log(props.pageNumber < props.noticesSorted.length && event.deltaY > 0)

      if (
        (props.pageNumber > 1 && event.deltaY < 0) ||
        (props.pageNumber < props.noticesSorted.length && event.deltaY > 0)
      ) {
        console.log("SCROLL");
        props.startPageNumberAnimation();
        setTimeout(
          () =>
            props.updatePageNumber({
              direction: event.deltaY < 0 ? "up" : "down",
              pageNumber:
                event.deltaY > 0 ? props.pageNumber + 1 : props.pageNumber - 1
            }),
          200
        );
      }
    }, 200),
    true
  );

  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(PageScroll);
