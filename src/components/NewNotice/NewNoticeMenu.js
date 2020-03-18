import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";

const mapStateToProps = state => ({ resize: state.notices.resize });

const mapDispatchToProps = dispatch => ({});

class NewNoticeMenu extends React.Component {
  constructor(props) {
    super();

    this.state = {
      containerWidth: null
    };
  }

  render() {
    return (
      <div
        id="new-notice-menu-container"
        className="new-notice-menu-container"
      >
        <div style={{ position: "relative" }}>
          <span id="new-notice-menu-text" className="new-notice-menu-text">
            pick notice type
          </span>
        </div>
        <div
          id="new-notice-menu"
          className="new-notice-menu"
        >
          <a id="new-notice-menu-poster" className="new-notice-menu-item">Poster</a>
          <a id="new-notice-menu-event" className="new-notice-menu-item">Event</a>
          <a id="new-notice-menu-discussion" className="new-notice-menu-item">Discussion</a>
          <a id="new-notice-menu-proclamation" className="new-notice-menu-item">Proclamation</a>
          <a id="new-notice-menu-business-card" className="new-notice-menu-item">Business Card</a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeMenu);
