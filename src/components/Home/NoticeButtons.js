import React from "react";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import agent from "../../agent";

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = dispatch => ({
});

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
    if (this.state.hover) {
      return { backgroundColor: "#c9eec7" };
    } else if (this.state.pinned) {
      return {
        backgroundColor: "#96d095"
      };
    } else {
      return { backgroundColor: "white" };
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
            <i className="pin-notice-icon"></i>
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeButtons);
