import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons"

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" })
});

class NoticePreview extends React.Component {
  render() {
    const notice = this.props.notice;
    const duration = {
      appear: 100,
      enter: 100,
      exit: 100
    };

    const defaultStyle = {
      boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
      borderRadius: "6px",
      margin: "10px",
      padding: "10px",
      backgroundColor: "white",
      position: "relative",
      transition: `opacity 0.1s linear`,
      opacity: "1",
      zIndex: "5000"
    };

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0" },
      exiting: { opacity: "1" },
      exited: { opacity: "1" }
    };
    return (
      <Transition in={!this.props.noticesVisible} timeout={duration}>
        {state => (
          <div
            className={`div${this.props.index}`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <Link
              style={{
                width: "100%"
              }}
              to={`notice/${notice.slug}`}
            >
              <div style={{ borderBottom: "1px dashed red" }}>
                {" "}
                <h3>{notice.title}</h3>
              </div>
              <h5>{notice.description}</h5>
              <span>{notice.body}</span>
            </Link>
            <div
              style={{
                marginRight: "5px"
              }}
            >
              <div
                style={{
                  margin: "4px",
                  overflow: "hidden"
                }}
              >
                <Link to={`@${notice.author.username}`}>
                  <img
                    style={{
                      borderRadius: "6px",
                      width: "40px",
                      height: "40px",
                      objectFit: "cover"
                    }}
                    src={notice.author.image}
                    alt="author"
                  />
                </Link>
              </div>
              <div>
                <Link to={`@${notice.author.username}`}>
                  {notice.author.username}
                </Link>
              </div>
            </div>
            <NoticeButtons notice={notice}/>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticePreview);
