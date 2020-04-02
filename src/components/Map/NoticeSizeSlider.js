import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";
import agent from "../../agent";

const mapStateToProps = state => ({
  noticeWidth: state.notices.noticeWidth,
  centerMap: state.map.centerMap
});

const mapDispatchToProps = dispatch => ({
  updateNoticeSize: payload =>
    dispatch({ type: "UPDATE_NOTICE_WIDTH", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload })
});

const NoticeSizeSlider = props => {
  const handleChange = function(event) {
    props.updateNoticeSize(event.target.value);
  };

  const updateSortedNotices = function() {
    props.updateUnsortedNotices(
      agent.Notices.all(JSON.stringify(props.centerMap))
    );
  };

  return (
    <div className="slidecontainer">
      <input
        onChange={handleChange}
        type="range"
        min="180"
        max="400"
        value={props.noticeWidth}
        className="slider"
        id="noticeSizeSlider"
        onMouseUp={updateSortedNotices}
      ></input>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeSizeSlider);
