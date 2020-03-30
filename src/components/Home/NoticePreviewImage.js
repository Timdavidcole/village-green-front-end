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

class NoticePreviewImage extends React.Component {
  constructor(props) {
    super(props);

    this.addDimensions = this.addDimensions.bind(this);
  }

  addDimensions(width, height) {
    if (!this.props.notice.height || this.props.notice.height < 50) {
      this.props.loadDivDim({
        title: this.props.notice.title,
        width: width,
        height: height,
        index: this.props.indexTrue
      });
    }
  }

  componentDidUpdate() {
    const noticeCard1 = document.getElementById(`noticeImage${this.props.index}`)
    if (!this.props.notice.height && !this.props.notice.width) {
      if (this.props.page !== "pinned") {
        this.addDimensions(
          noticeCard1.offsetWidth,
          noticeCard1.offsetHeight
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
              padding: "0px",
              backgroundColor: "transparent",
              boxShadow: "none",
              order: notice.order,
              ...transitionStyles[state]
            }}
          >
            <div className="card-container">
              <div
                className="card-front"
                style={{
                  backgroundColor: "transparent",
                  backgroundImage: `url(${notice.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  height: `${notice.height}px`,
                  width: `${notice.width}px`
                }}
              >
                <img
                  id={`noticeImage${this.props.index}`}
                  alt=""
                  src={notice.image}
                  style={{
                    visibility: "hidden",
                    maxWidth: `${this.props.noticeWidth}px`
                  }}
                  onLoad={ev => {
                    if (this.props.page !== "pinned") {
                      console.log('component loaded load div dims')

                      this.addDimensions(
                        ev.target.offsetWidth,
                        ev.target.offsetHeight
                      );
                    }
                  }}
                />
              </div>
              <div
                className="card-back"
                style={{
                  width: `${this.props.noticeWidth}px`,
                  height: notice.height,
                  backgroundColor: "#e4dfc0"
                }}
              >
                <Link to={`notice/${notice.slug}`}>
                  <div style={{ color: "#4faa4f", width: "100%" }}>
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
                        overflowX: "auto",
                        fontSize: "0.8rem"
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
