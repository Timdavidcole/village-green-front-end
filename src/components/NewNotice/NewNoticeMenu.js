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
      <div id="new-notice-menu-container" className="new-notice-menu-container">
        <div style={{ position: "relative" }}>
          <span id="new-notice-menu-text" className="new-notice-menu-text">
            pick notice type
          </span>
        </div>
        <a
          href="#"
          id="new-notice-menu-poster"
          className="new-notice-menu-item"
        >
          poster
        </a>
        <a href="#" id="new-notice-menu-event" className="new-notice-menu-item">
          event
        </a>
        <a
          href="#"
          id="new-notice-menu-discussion"
          className="new-notice-menu-item"
        >
          discussion
        </a>
        <a
          href="#"
          id="new-notice-menu-proclamation"
          className="new-notice-menu-item"
        >
          proclamation
        </a>
        <a
          href="#"
          id="new-notice-menu-business-card"
          className="new-notice-menu-item"
        >
          business Card
        </a>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeMenu);
