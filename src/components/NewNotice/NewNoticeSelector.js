import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class NewNoticeSelector extends React.Component {
  constructor(props) {
    super();

    this.state = {
      textWidth: null,
      containerWidth: null
    };
  }
  componentDidMount() {
    console.log(document.getElementById("new-notice-selector-text"));
    if (document.getElementById("new-notice-selector-text")) {
      this.setState({
        textWidth: document.getElementById("new-notice-selector-text")
          .offsetWidth,
        containerWidth: document.getElementById("new-notice-radio-list")
          .offsetWidth
      });
    }
  }

  render() {
    console.log(this.state.textWidth);
    return (
      <div style={{ position: "relative", top: "20%", height: "60%" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <span
            id="new-notice-selector-text"
            style={{ left: `calc(50% - ${this.state.textWidth / 2}px)` }}
            className="new-notice-selector-text"
          >
            What type of notice would you like?
          </span>
        </div>
        <form
          id="new-notice-radio-list"
          className="new-notice-radio-list"
          style={{ left: `calc(50% - ${this.state.containerWidth / 2}px)` }}
        >
          <div className="new-notice-type-container">
            <input
              className="new-notice-type-radio"
              type="radio"
              id="poster"
              name="newNoticeType"
              value="poster"
            ></input>
            <label className="new-notice-type-label" for="poster">
              {" "}
              Poster
            </label>
          </div>
          <div className="new-notice-type-container">
            <input
              className="new-notice-type-radio"
              type="radio"
              id="event"
              name="newNoticeType"
              value="event"
            ></input>
            <label className="new-notice-type-label" for="event">
              {" "}
              Event
            </label>
          </div>
          <div className="new-notice-type-container">
            <input
              className="new-notice-type-radio"
              type="radio"
              id="discussion"
              name="newNoticeType"
              value="discussion"
            ></input>
            <label className="new-notice-type-label" for="discussion">
              {" "}
              Discussion
            </label>
          </div>
          <div className="new-notice-type-container">
            <input
              className="new-notice-type-radio"
              type="radio"
              id="text"
              name="newNoticeType"
              value="text"
            ></input>
            <label className="new-notice-type-label" for="text">
              {" "}
              Proclamation
            </label>
          </div>
          <div className="new-notice-type-container">
            <input
              className="new-notice-type-radio"
              type="radio"
              id="business-card"
              name="newNoticeType"
              value="business-card"
            ></input>
            <label className="new-notice-type-label" for="business-card">
              Business Card
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeSelector);
