import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";
import agent from "../../agent";

const mapStateToProps = (state) => ({
  noticeWidth: state.notices.noticeWidth,
  centerMap: state.map.centerMap,
  noticesWindowDims: state.notices.noticesWindowDims,
});

const mapDispatchToProps = (dispatch) => ({
  updateNoticeSize: (payload) =>
    dispatch({ type: "UPDATE_NOTICE_WIDTH", payload }),
  updateUnsortedNotices: (payload) =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
});

const NoticeSizeSlider = (props) => {
  const handleChange = function (event) {
    props.updateNoticeSize(event.target.value);
  };

  const fillSpace = function (noticeSliderWidth) {
    const columns = Math.floor(
      props.noticesWindowDims.width / noticeSliderWidth
    );
    const extraSpace =
      (props.noticesWindowDims.width % noticeSliderWidth) / columns;
    const newColumnWidth = extraSpace + noticeSliderWidth;
    return newColumnWidth;
  };

  const resizeAndResort = function () {
    props.updateNoticeSize(fillSpace(parseInt(props.noticeWidth)));
    props.updateUnsortedNotices(
      agent.Notices.all(JSON.stringify(props.centerMap))
    );
  };

  return (
    <div className="slidecontainer">
      <input
        onChange={handleChange}
        type="range"
        min={
          props.noticesWindowDims
            ? `${props.noticesWindowDims.width / 6}`
            : "200"
        }
        max={
          props.noticesWindowDims
            ? `${props.noticesWindowDims.width / 2}`
            : "500"
        }
        value={props.noticeWidth}
        className="slider"
        id="noticeSizeSlider"
        onMouseUp={resizeAndResort}
      ></input>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeSizeSlider);
