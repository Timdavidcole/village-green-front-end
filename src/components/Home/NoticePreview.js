import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" })
});

class NoticePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { randomTop: null, randomLeft: null };

    this.getRndInteger = this.getRndInteger.bind(this);
  }

  componentDidMount() {
    this.setState({
      randomTop: this.getRndInteger(-20, 20),
      randomLeft: this.getRndInteger(-20, 20)
    });
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

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
      zIndex: "5000",
      top: `${this.state.randomTop}px`,
      left: `${this.state.randomLeft}px`,
      pointerEvents: "auto"
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
            <div
              style={{
                width: "100%"
              }}
            >
              <Link to={`notice/${notice.slug}`}>
                <div style={{ width: "100%" }}>
                  <div style={{ borderBottom: "1px dashed red" }}>
                    {" "}
                    <h3>{notice.title}</h3>
                  </div>
                  <h5>{notice.description}</h5>
                  <span>{notice.body}</span>
                </div>
              </Link>
              <div
                style={{
                  width: "100%",
                  position: "relative",
                  bottom: "5px",
                  margin: "0px"
                }}
              >
                <div
                  style={{
                    display: "inline-block"
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden"
                    }}
                  >
                    <Link to={`@${notice.author.username}`}>
                      <img
                        style={{
                          borderRadius: "6px",
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                          margin: "5px"
                        }}
                        src={notice.author.image}
                        alt="author"
                      />
                      {notice.author.username}
                    </Link>
                  </div>
                </div>
                <NoticeButtons
                  page={this.props.page}
                  index={this.props.index - 2}
                  notice={notice}
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticePreview);
