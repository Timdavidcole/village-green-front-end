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
  updatedUnsorted: state.notices.updatedUnsorted
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

  addDimensions(width, height) {
    if (this.props.page === "pinned") {
      return null;
    } else if (this.props.noticesWithDim.length === this.props.notices.length) {
      if (this.props.noticesWithDim[this.props.indexTrue].height === height) {
        return null;
      }
    } else {
      var newNotice;
      if (this.props.sorted) {
        newNotice = this.props.noticesWithDim[this.props.indexTrue];
      } else {
        newNotice = this.props.notices[this.props.indexTrue];
      }
      newNotice.width = width;
      newNotice.height = height;
      if (
        newNotice.height > 100 &&
        !this.props.noticesWithDimsIDs.includes(this.props.notice.id)
      ) {
        this.props.loadDivDim({
          newNotice: newNotice,
          newNoticeId: newNotice.id
        });
      }
    }
  }

  componentDidUpdate() {

    var newNotice;
    if (
      this.props.updatedUnsorted &&
      !this.props.noticesWithDimsIDs.includes(this.props.notice.id)
    ) {
      if (this.props.sorted) {
        newNotice = this.props.noticesWithDim[this.props.indexTrue];
      } else {
        newNotice = this.props.notices[this.props.indexTrue];
      }
      newNotice.width = this.divElement.clientWidth;
      newNotice.height = this.divElement.clientHeight;
      if (newNotice.height > 100 && !this.props.sorted) {
        this.props.loadDivDim({
          newNotice: newNotice,
          newNoticeId: newNotice.id
        });
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
      borderRadius: "6px",
      margin: "auto",
      backgroundColor: "transparent",
      position: "relative",
      transition: `opacity 0.2s linear`,
      opacity: "1",
      zIndex: "5000",
      pointerEvents: "auto",
      display: "inline-block",
      width: "250px",
      height: `${notice.height || "auto"}`,
      verticalAlign: "top",
      visibility: "visible"
    };

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0", visibility: "hidden" },
      exiting: { opacity: "1" },
      exited: { opacity: "1", visibility: "visible" }
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
            ref={divElement => {
              this.divElement = divElement;
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
                  alt=""
                  src={notice.image}
                  style={{ visibility: "hidden", maxWidth: "250px" }}
                  onLoad={ev => {
                    this.addDimensions(
                      ev.target.offsetWidth,
                      ev.target.offsetHeight
                    );
                  }}
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
