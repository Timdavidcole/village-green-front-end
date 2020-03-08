import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  notices: state.notices.notices,
  noticesWithDim: state.notices.noticesWithDim,
  noticesPinned: state.pinned.notices
});

const mapDispatchToProps = dispatch => ({
  pinNotice: payload => dispatch({ type: "PIN_NOTICE", payload }),
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  updatePinned: payload => dispatch({ type: "REMOVE_PINNED", payload }),
  removePinnedEvent: () => dispatch({ type: "REMOVE_PINNED_EVENT" })
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
            notices.splice(this.props.index + 1, 1);
            return notices;
          } else {
            notices = [...this.props.noticesWithDim];
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
          setTimeout(() => this.props.removePinnedEvent(), 300);
        });
    } else {
      agent.Pinned.pinNotice(this.props.notice.slug)
        .then(notice => {
          if (this.props.page === "pinned") {
            var notices = [...this.props.noticesPinned];
            notices.splice(this.props.index + 1, 1);
            return notices;
          } else {
            notices = [...this.props.noticesWithDim];
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
          setTimeout(() => this.props.removePinnedEvent(), 300);
        });
    }
  }

  pinStyle() {
    if (this.state.hover) {
      return { backgroundColor: "#c9eec7" };
    } else if (this.props.notice.isPinned) {
      return {
        backgroundColor: "#96d095"
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
