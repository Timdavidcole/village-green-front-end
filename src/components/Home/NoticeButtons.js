import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  notices: state.notices.notices,
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
    if (this.props.notice.isPinned) {
      agent.Pinned.unPinNotice(this.props.notice.slug)
        .then(notice => {
          var notices = [...this.props.notices];
          notices[this.props.index] = notice.notice;
          return notices;
        })
        .then(newNotices => {
          this.props.pinNotice(newNotices);
        });
    } else {
      agent.Pinned.pinNotice(this.props.notice.slug)
        .then(notice => {
          var notices = [...this.props.notices];
          notices[this.props.index] = notice.notice;
          return notices;
        })
        .then(newNotices => {
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
