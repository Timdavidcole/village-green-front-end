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
    if (!this.props.notice.height) {
      this.props.loadDivDim({
        title: this.props.notice.title,
        width: width,
        height: height,
        index: this.props.indexTrue
      });
    }
  }

  componentDidUpdate() {
    if (!this.props.notice.height || !this.props.notice.width) {
      this.addDimensions(
        document.getElementById(`noticeCard${this.props.index}`).offsetWidth,
        document.getElementById(`noticeCard${this.props.index}`).offsetHeight
      );
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
      <Transition in={!this.props.noticesVisible} timeout={duration}>
        {state => (
          <div
            id={`noticeCard${this.props.index}`}
            className={`noticeCard`}
            style={{
              order: notice.order,
              ...transitionStyles[state]
            }}
            onLoad={ev => {
              this.addDimensions(
                document.getElementById(`noticeCard${this.props.index}`)
                  .offsetWidth,
                document.getElementById(`noticeCard${this.props.index}`)
                  .offsetHeight
              );
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
                <div style={{ width: "230px" }}>
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
                      width: "230px",
                      textAlign: "center",
                      marginBottom: "40px",
                      maxHeight: "121px",
                      overflowY: "auto",
                      overflowX: "hidden"
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
