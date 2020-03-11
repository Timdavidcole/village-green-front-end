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
            className={"noticeCard"}
            style={{
              padding: "0px",
              backgroundColor: "transparent",
              boxShadow: "none",
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
                      document.getElementById(`noticeCard${this.props.index}`)
                        .offsetWidth,
                      document.getElementById(`noticeCard${this.props.index}`)
                        .offsetHeight
                    );
                  }}
                />
              </div>
              <div
                className="card-back"
                style={{
                  width: "250px",
                  backgroundColor: "#e4dfc0",
                  padding: "10px",
                  minHeight: notice.height
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
                        height: "121px",
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
