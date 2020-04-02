import NoticesPage from "./NoticesPage";
import React from "react";
import "../../styles/notices.css";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";

const mapStateToProps = state => ({
  pageNumberAnimation: state.notices.pageNumberAnimation,
  pageChangeDirection: state.notices.pageChangeDirection
});

const mapDispatchToProps = dispatch => ({
  stopPageNumberAnimation: () =>
    dispatch({ type: "STOP_PAGE_NUMBER_ANIMATION" })
});

class NoticesPageTransition extends React.Component {
  render() {
    const duration = 200;

    const transitionStyles = () => {
      if (this.props.pageChangeDirection === "up") {
        return {
          entering: { opacity: "0", transform: "translate(0px, -500px)" },
          entered: { opacity: "0", transform: "translate(0px, 500px)" },
          exiting: { opacity: "0", transform: "translate(0px, 500px)" },
          exited: { opacity: "1" }
        };
      } else
        return {
          entering: { opacity: "0", transform: "translate(0px, 500px)" },
          entered: { opacity: "0", transform: "translate(0px, -500px)" },
          exiting: { opacity: "0", transform: "translate(0px, -500px)" },
          exited: { opacity: "1" }
        };
    };

    if (!this.props.noticesByPage) {
      return null;
    }
    if (this.props.pageNumberAnimation) {
      setTimeout(() => {
        this.props.stopPageNumberAnimation();
      }, duration);
    }
    return (
      <Transition
        in={this.props.pageNumberAnimation}
        out={!this.props.pageNumberAnimation}
        timeout={duration}
      >
        {state => (
          <div
            className="noticesSwipeAnimation"
            style={{
              pointerEvents: "none",
              ...transitionStyles()[state]
            }}
          >
            <NoticesPage noticesByPage={this.props.noticesByPage}/>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticesPageTransition);
