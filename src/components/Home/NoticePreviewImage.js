import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons";
import NoticePreviewUser from "./NoticePreviewUser";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  notices: state.notices.notices
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  loadDivDim: payload => dispatch({ type: "LOAD_DIV_DIMENSIONS", payload })
});

class NoticePreviewImage extends React.Component {
  constructor(props) {
    super(props);

    this.addDimensions = this.addDimensions.bind(this);
  }

  addDimensions(width, height, index) {
    var newNotice = this.props.notices[index];
    newNotice.width = width;
    newNotice.height = height;
    if (newNotice.height > 24) {
      this.props.loadDivDim(newNotice);
    }
  }

  render() {
    const notice = this.props.notice;
    const duration = {
      appear: 100,
      enter: 100,
      exit: 100
    };

    const defaultStyle = {
      borderRadius: "6px",
      margin: "10px",
      backgroundColor: "transparent",
      position: "relative",
      transition: `opacity 0.2s linear`,
      opacity: "1",
      zIndex: "5000",
      pointerEvents: "auto",
      display: "inline-block",
      width: "250px",
      height: "auto",
      verticalAlign: "top"
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
            className={"noticeCard"}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
            ref={el => {
              if ((el && !notice.width) || (el && notice.height === 24)) {
                this.addDimensions(
                  el.offsetWidth,
                  el.offsetHeight,
                  this.props.indexTrue
                );
              }
            }}
          >
            <div
              className="card-inner"
              style={{
                width: "auto",
                height: "auto",
                backgroundColor: "#e4dfc0"
              }}
            >
              <div
                className="card-front"
                style={{
                  backgroundColor: "transparent",
                  backgroundImage: `url(${notice.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <img
                  src={notice.image}
                  style={{ visibility: "hidden", maxWidth: "250px" }}
                />
              </div>
              <div
                className="card-back"
                style={{
                  height: "100%",
                  width: "250px",
                  backgroundColor: "#e4dfc0",
                  padding: "10px"
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
                        textAlign: "center",
                        marginBottom: "10px"
                      }}
                    >
                      {notice.body}
                    </span>
                  </div>
                </Link>
                <div
                  style={{
                    width: "93%",
                    position: "absolute",
                    margin: "0px",
                    bottom: "5px"
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
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticePreviewImage);
