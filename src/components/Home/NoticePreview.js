import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons";
import NoticePreviewUser from "./NoticePreviewUser";

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

    this.state = { randomTop: 0, randomLeft: 0 };

    this.getRndInteger = this.getRndInteger.bind(this);
  }

  componentDidMount() {
    if (this.props.page !== "pinned") {
      this.setState({
        randomTop: this.getRndInteger(-5, 5),
        randomLeft: this.getRndInteger(-5, 5)
      });
    }
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
      backgroundColor: "#fffbf0",
      position: "relative",
      transition: `opacity 0.2s linear`,
      opacity: "1",
      zIndex: "5000",
      pointerEvents: "auto",
      display: "inline-block",
      width: "290px",
      verticalAlign: "top",
      float: "left"

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
                width: "100%",
                height: "100%",
                position: "relative"
              }}
            >
              <Link to={`notice/${notice.slug}`}>
                <div style={{ width: "100%" }}>
                  <div style={{ borderBottom: "1px dashed red" }}>
                    <h3 style={{ textAlign: "center" }}>{notice.title}</h3>
                  </div>
                  <span
                    style={{
                      textAlign: "center",
                      display: "inline-block",
                      width: "100%"
                    }}
                  >
                    {notice.description}
                  </span>
                  <br></br>
                  <span
                    style={{
                      display: "inline-block",
                      height: "110px",
                      fontSize: "1.3vh",
                      overflowY: "auto",
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    {notice.body}
                  </span>
                </div>
              </Link>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  margin: "0px",
                  bottom: "-5px"
                }}
              >
                <NoticePreviewUser notice={notice} />
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
