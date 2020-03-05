import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  notices: state.notices.notices,
  noticesPinned: state.pinned.notices
});

const mapDispatchToProps = dispatch => ({
  pinNotice: payload => dispatch({ type: "UPDATE_NOTICE", payload }),
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  updatePinned: payload => dispatch({ type: "UPDATE_PINNED", payload })
});

class NoticeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.pinNotice = this.pinNotice.bind(this);
    this.toggleHoverIn = this.toggleHoverIn.bind(this);
    this.toggleHoverOut = this.toggleHoverOut.bind(this);
  }

  pinNotice() {
    if (this.props.notice.isPinned) {
      agent.Pinned.unPinNotice(this.props.notice.slug)
        .then(notice => {
          if (this.props.page === "pinned") {
            var notices = [...this.props.noticesPinned];
            console.log(notices[this.props.index + 1]);
            notices.splice(this.props.index + 1, 1);
            console.log(notices);
            return notices;
          } else {
            var notices = [...this.props.notices];
            notices[this.props.index] = notice.notice;
            return notices;
          }
        })
        .then(newNotices => {
          if (this.props.page === "pinned") {
            this.props.updatePinned(newNotices);
          } else {
            this.props.pinNotice(newNotices);
          }
        });
    } else {
      agent.Pinned.pinNotice(this.props.notice.slug)
        .then(notice => {
          if (this.props.page === "pinned") {
            var notices = [...this.props.noticesPinned];
            console.log(notices[this.props.index + 1]);
            notices.splice(this.props.index + 1, 1);
            console.log(notices);
            return notices;
          } else {
            var notices = [...this.props.notices];
            notices[this.props.index] = notice.notice;
            return notices;
          }
        })
        .then(newNotices => {
          if (this.props.page === "pinned") {
            this.props.updatePinned(newNotices);
          } else {
            this.props.pinNotice(newNotices);
          }
        });
    }
  }

  pinStyle() {
    console.log(this.state.hover);
    if (this.state.hover) {
      return { backgroundColor: "#a6eea3" };
    } else if (this.props.notice.isPinned) {
      return {
        backgroundColor: "#70c46e"
      };
    } else {
      return { backgroundColor: "white" };
    }
  }

  toggleHoverIn(event) {
    this.setState({ hover: true });
  }

  toggleHoverOut(event) {
    this.setState({ hover: false });
  }

  render() {
    return (
      <div className="thumb-buttons-container">
        <button
          onClick={() => this.pinNotice()}
          className="pin-notice-button"
          style={this.pinStyle()}
          onMouseEnter={this.toggleHoverIn}
          onMouseLeave={this.toggleHoverOut}
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
