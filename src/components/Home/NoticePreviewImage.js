import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import { Transition } from "react-transition-group";
import NoticeButtons from "./NoticeButtons";
import NoticePreviewUser from "./NoticePreviewUser";

const mapStateToProps = (state) => ({
  sorted: state.notices.sorted,
  noticesHidden: state.notices.noticesHidden,
  noticeWidth: state.notices.noticeWidth,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  loadDivDim: (payload) => dispatch({ type: "LOAD_DIV_DIMENSIONS", payload }),
});

class NoticePreviewImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null,
    };

    this.addDimensions = this.addDimensions.bind(this);
  }

  addDimensions(width, height) {
    if (!this.props.notice.height || this.props.notice.height < 50) {
      this.props.loadDivDim({
        title: this.props.notice.title,
        width: width,
        height: height,
        index: this.props.indexTrue,
      });
    }
  }

  componentDidUpdate() {
    const noticeCard1 = document.getElementById(
      `noticeImage${this.props.index}`
    );
    if (!this.props.notice.height && !this.props.notice.width) {
      if (this.props.page !== "pinned") {
        this.addDimensions(noticeCard1.offsetWidth, noticeCard1.offsetHeight);
      }
    }
  }

  render() {
    console.log(this.state);
    const notice = this.props.notice;
    const duration = {
      appear: 100,
      enter: 100,
      exit: 100,
    };

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0" },
      exiting: { opacity: "1" },
      exited: { opacity: "1" },
    };
    return (
      <Transition
        in={!this.props.noticesVisible || !this.props.sorted}
        timeout={duration}
      >
        {(state) => (
          <div
            id={`noticeCard${this.props.index}`}
            className={"noticeCard"}
            style={{
              display: this.props.noticesHidden ? "none" : "inline-block",
              padding: "0px",
              backgroundColor: "transparent",
              boxShadow: "none",
              order: notice.order,
              ...transitionStyles[state],
            }}
          >
            <div className="card-container">
              <img
                className="card-front"
                id={`noticeImage${this.props.index}`}
                alt=""
                src={notice.image}
                style={{
                  minHeight: "160",
                  maxWidth: `${this.props.noticeWidth}px`,
                }}
                onLoad={(ev) => {
                  if (
                    this.props.page !== "pinned" ||
                    ev.target.offsetHeight !== 0
                  ) {
                    this.setState({ width: ev.target.offsetWidth, height: ev.target.offsetHeight });

                    this.addDimensions(
                      ev.target.offsetWidth,
                      ev.target.offsetHeight
                    );
                  }
                }}
              />
              <div
                className="card-back"
                style={{
                  width: `${this.state.width || this.props.noticeWidth}px`,
                  height: notice.height,
                  backgroundColor: "var(--noobo-card-background-yellow)",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={`notice/${notice.slug}`}>
                  <div style={{ color: "var(--noobo-darker-green)" }}>
                    <div style={{ borderBottom: "1px dashed red" }}>
                      <h3 style={{ margin: "0px", textAlign: "center" }}>
                        {notice.title}
                      </h3>
                    </div>
                    <span
                      id={`noticeCardDesc${this.props.index}`}
                      style={{
                        textAlign: "center",
                        display: "inline-block",
                        width: "100%",
                        fontStyle: "italic",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      {notice.description}
                    </span>
                    <br></br>
                    <span
                      id={`noticeCardBody`}
                      style={{
                        display: "inline-block",
                        padding: "0px",
                        margin: "0px",
                        width: "100%",
                        textAlign: "center",
                        maxHeight: "121px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        fontSize: "0.8rem",
                      }}
                    >
                      {notice.body}
                    </span>
                  </div>
                </Link>
                <div
                  style={{
                    width: "calc(100% - 20px)",
                    position: "absolute",
                    margin: "0px",
                    bottom: "5px",
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
