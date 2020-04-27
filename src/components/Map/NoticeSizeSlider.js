import React from "react";
import "../../styles/mapStyles.css";
import { connect } from "react-redux";
import agent from "../../agent";

const mapStateToProps = (state) => ({
  columnsCount: state.notices.columnsCount,
  noticeWidth: state.notices.noticeWidth,
  resize: state.notices.resize,
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

class NoticeSizeSlider extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.resizeAndResort = this.resizeAndResort.bind(this);
  }

  handleChange(event) {
    this.props.updateColumnsCount(parseInt(event.target.value));
    this.props.updateNoticeSize(
      Math.floor(
        this.props.noticesWindowDims.width / parseInt(event.target.value) - 20
      )
    );
  }

  resizeAndResort() {
    this.props.updateUnsortedNotices(
      agent.Notices.all(JSON.stringify(this.props.centerMap))
    );
  }
  render() {
    return (
      <div className="slidecontainer">
        <input
          onChange={this.handleChange}
          type="range"
          min="2"
          max="6"
          value={this.props.columnsCount}
          className="slider"
          id="noticeSizeSlider"
          onMouseUp={this.resizeAndResort}
        ></input>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeSizeSlider);
