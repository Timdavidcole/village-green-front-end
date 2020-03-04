import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  ...state.notices,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  pinNotice: payload => dispatch({ type: "UPDATE_NOTICE", payload }),
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

class NoticeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.pinNotice = this.pinNotice.bind(this);
  }

  pinNotice() {
    var newNotices = this.props.notices;
    if (this.props.notice.isPinned) {
      agent.Pinned.unPinNotice(this.props.notice.slug)
        .then(() => (newNotices[this.props.index] = this.props.notice))
        .then(() => {
          this.props.pinNotice(newNotices);
        });
    } else {
      agent.Pinned.pinNotice(this.props.notice.slug)
        .then(() => (newNotices[this.props.index] = this.props.notice))
        .then(() => {
          this.props.pinNotice(newNotices);
        });
    }
  }

  pinStyle() {
    if (this.props.notice.isPinned) {
      return {
        backgroundColor: "#169211"
      };
    }
  }

  render() {
    return (
      <div className="thumb-buttons-container">
        <button
          onClick={() => this.pinNotice()}
          className="pin-notice-button"
          style={this.pinStyle()}
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
