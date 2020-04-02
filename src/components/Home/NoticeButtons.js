import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = dispatch => ({});

class NoticeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      pinned: false
    };
    this.pinNotice = this.pinNotice.bind(this);
    this.toggleHoverIn = this.toggleHoverIn.bind(this);
    this.toggleHoverOut = this.toggleHoverOut.bind(this);
  }

  componentDidMount() {
    this.setState({ pinned: this.props.notice.isPinned });
  }

  pinNotice() {
    if (this.state.pinned) {
      agent.Pinned.unPinNotice(this.props.notice.slug);
      this.setState({ pinned: false });
    } else {
      agent.Pinned.pinNotice(this.props.notice.slug);
      this.setState({ pinned: true });
    }
  }

  pinStyle() {
    if (this.state.pinned && this.state.hover) {
      return {
        backgroundColor: "var(--noobo-medium-green)",
        boxShadow: "1px 1px 0px 0px var(--box-shadow-dark-grey)",
        transform: "translate(2px, 2px)",
        color: "var(--noobo-darker-green)"
      };
    } else if (this.state.hover) {
      return { backgroundColor: "#c9eec7" };
    } else if (this.state.pinned) {
      return {
        backgroundColor: "var(--noobo-medium-green)",
        boxShadow: "1px 1px 0px 0px var(--box-shadow-dark-grey)",
        transform: "translate(2px, 2px)",
        color: "var(--noobo-darker-green)"
      };
    } else {
      return { backgroundColor: "white", color: "var(--noobo-dark-green)" };
    }
  }

  toggleHoverIn() {
    this.setState({ hover: true });
  }

  toggleHoverOut() {
    this.setState({ hover: false });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="thumb-buttons-container">
          <button
            onClick={() => this.pinNotice()}
            className="pin-notice-button"
            style={this.pinStyle()}
            onMouseEnter={this.toggleHoverIn}
            onMouseLeave={this.toggleHoverOut}
          >
            <i class="fas fa-thumbtack"></i>
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeButtons);
