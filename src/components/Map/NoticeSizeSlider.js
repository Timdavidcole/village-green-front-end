import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";
import agent from "../../agent";

const mapStateToProps = (state) => ({
  columnsCount: state.notices.columnsCount,
  noticeWidth: state.notices.noticeWidth,
  centerMap: state.map.centerMap,
  noticesWindowDims: state.notices.noticesWindowDims,
});

const mapDispatchToProps = (dispatch) => ({
  updateColumnsCount: (payload) =>
    dispatch({ type: "UPDATE_COLUMNS_COUNT", payload }),
  updateNoticeSize: (payload) =>
    dispatch({ type: "UPDATE_NOTICE_WIDTH", payload }),
  updateUnsortedNotices: (payload) =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
});

const NoticeSizeSlider = (props) => {
  const handleChange = function (event) {
    props.updateColumnsCount(parseInt(event.target.value));
    props.updateNoticeSize(
      Math.floor(props.noticesWindowDims.width / parseInt(event.target.value) - 10)
    );
  };

  const resizeAndResort = function (event) {
    props.updateUnsortedNotices(
      agent.Notices.all(JSON.stringify(props.centerMap))
    );
  };
  return (
    <div className="slidecontainer">
      <input
        onChange={handleChange}
        type="range"
        min="2"
        max="6"
        value={props.columnsCount}
        className="slider"
        id="noticeSizeSlider"
        onMouseUp={resizeAndResort}
      ></input>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeSizeSlider);
