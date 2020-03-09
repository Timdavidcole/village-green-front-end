import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons";
import NoticePreviewUser from "./NoticePreviewUser";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  notices: state.notices.notices,
  sorted: state.notices.sorted,
  noticesWithDim: state.notices.noticesWithDim,
  noticesWithDimsIDs: state.notices.noticesWithDimsIDs,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  loadDivDim: payload => dispatch({ type: "LOAD_DIV_DIMENSIONS", payload })
});

class NoticePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { randomTop: 0, randomLeft: 0};

    this.addDimensions = this.addDimensions.bind(this);
  }

  addDimensions(width, height, index) {
    if (this.props.page === "pinned") {
      return null;
    } else if (this.props.noticesWithDim.length === this.props.notices.length) {
      if (this.props.noticesWithDim[index].height === height) {
        return null;
      }
    } else {
      var newNotice = this.props.notices[index];
      newNotice.width = width;
      newNotice.height = height;
      if (!this.props.noticesWithDimsIDs.includes(this.props.notice.id)) {
        this.props.loadDivDim({newNotice: newNotice, newNoticeId: newNotice.id});
      }
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
      width: "250px",
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
            className={`div${this.props.index}`}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
            ref={el => {
              if (el && !notice.width && !this.state.sorted) {
                this.addDimensions(
                  el.offsetWidth,
                  el.offsetHeight,
                  this.props.indexTrue
                );
              }
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
                      width: "100%",
                      fontStyle: "italic"
                    }}
                  >
                    {notice.description}
                  </span>
                  <br></br>
                  <span
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "center",
                      marginBottom: "40px",
                      maxHeight: "121px",
                      overflowY: "auto",
                      overflowX: "auto"
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
