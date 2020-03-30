import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons";
import NoticePreviewUser from "./NoticePreviewUser";

const mapStateToProps = state => ({
  sorted: state.notices.sorted,
  noticesHidden: state.notices.noticesHidden,
  noticeWidth: state.notices.noticeWidth
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  loadDivDim: payload => dispatch({ type: "LOAD_DIV_DIMENSIONS", payload })
});

class NoticePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { randomTop: 0, randomLeft: 0 };

    this.addDimensions = this.addDimensions.bind(this);
  }

  addDimensions(width, height) {
    if (!this.props.notice.height && this.props.page !== "pinnned") {
      this.props.loadDivDim({
        title: this.props.notice.title,
        width: width,
        height: height,
        index: this.props.indexTrue
      });
    }
  }

  componentDidUpdate() {
    if (!this.props.notice.height && !this.props.notice.width) {
      if (this.props.page !== "pinned") {
        this.addDimensions(
          document.getElementById(`noticeCard${this.props.index}`).offsetWidth,
          document.getElementById(`noticeCard${this.props.index}`).offsetHeight
        );
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

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0" },
      exiting: { opacity: "1" },
      exited: { opacity: "1" }
    };
    return (
      <Transition
        in={!this.props.noticesVisible || !this.props.sorted}
        timeout={duration}
      >
        {state => (
          <div
            id={`noticeCard${this.props.index}`}
            className={"noticeCard"}
            style={{
              display: this.props.noticesHidden ? "none" : "inline-block",
              order: notice.order,
              ...transitionStyles[state]
            }}
            onLoad={ev => {
              if (this.props.page !== "pinned") {
                console.log(ev.target.offsetHeight)
                this.addDimensions(
                  document.getElementById(`noticeCard${this.props.index}`)
                    .offsetWidth,
                  document.getElementById(`noticeCard${this.props.index}`)
                    .offsetHeight
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
                <div style={{ color: "#4faa4f", width: `${this.props.noticeWidth - 20}px` }}>
                  <div style={{ borderBottom: "1px dashed red" }}>
                    <h3 style={{ margin: "0px", textAlign: "center" }}>{notice.title}</h3>
                  </div>
                  <span
                    style={{
                      textAlign: "center",
                      display: "inline-block",
                      width: "100%",
                      fontStyle: "italic",
                      fontSize: "0.9rem",
                      marginBottom: "5px"
                    }}
                  >
                    {notice.description}
                  </span>
                  <br></br>
                  <span
                    style={{
                      display: "inline-block",
                      width: `${this.props.noticeWidth - 20}px`,
                      textAlign: "center",
                      marginBottom: "40px",
                      maxHeight: "121px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      fontSize: "0.8rem"
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
