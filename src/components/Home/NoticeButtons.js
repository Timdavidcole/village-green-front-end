import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  ...state.notices,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  pinNotice: payload => dispatch({ type: "PIN_NOTICE", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

class NoticeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.pinNotice = this.pinNotice.bind(this);
  }

  pinNotice() {
    this.props.pinNotice(agent.Pinned.pinNotice(this.props.notice.slug));
  }

  render() {
    return (
      <div className="thumb-buttons-container">
        <button
          onClick={event => this.pinNotice(event)}
          className="pin-notice-button"
        >
          <i className="pin-notice-icon"></i>
        </button>
        <button className="thumbs-up-button">
          <i className="thumbs-up-icon"></i>
        </button>
        <button className="thumbs-down-button">
          <i className="thumbs-down-icon"></i>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeButtons);
