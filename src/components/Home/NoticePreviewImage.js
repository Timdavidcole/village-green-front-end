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
    if (!this.props.notice1.height || this.props.notice1.height < 50) {
      this.props.loadDivDim({
        title: this.props.notice1.title,
        width: width,
        height: height,
        index: this.props.indexTrue
      });
    }
  }

  componentDidUpdate() {
    if (!this.props.notice1.height && !this.props.notice1.width) {
      if (this.props.page !== "pinned") {
        this.addDimensions(
          document.getElementById(`noticeCard${this.props.index}`).offsetWidth,
          document.getElementById(`noticeCard${this.props.index}`).offsetHeight
        );
      }
    }
  }

  render() {
    const notice1 = this.props.notice1;
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
      <Transition in={!this.props.noticesVisible || !this.props.sorted} timeout={duration}>
        {state => (
          <div
            id={`noticeCard${this.props.index}`}
            className={"noticeCard"}
            style={{
              padding: "0px",
              backgroundColor: "transparent",
              boxShadow: "none",
              order: notice1.order,
              ...transitionStyles[state]
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
                  backgroundImage: `url(${notice1.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <img
                  alt=""
                  src={notice1.image}
                  style={{ visibility: "hidden", maxWidth: "250px" }}
                  onLoad={ev => {
                    if (this.props.page !== "pinned") {
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
                  width: "250px",
                  backgroundColor: "#e4dfc0",
                  padding: "10px",
                  minHeight: notice1.height
                }}
              >
                <Link to={`notice/${notice1.slug}`}>
                  <div style={{ width: "100%" }}>
                    <div style={{ borderBottom: "1px dashed red" }}>
                      <h3 style={{ textAlign: "center" }}>{notice1.title}</h3>
                    </div>
                    <span
                      style={{
                        textAlign: "center",
                        display: "inline-block",
                        width: "100%"
                      }}
                    >
                      {notice1.description}
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
                      {notice1.body}
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
                  <NoticePreviewUser notice={notice1} />
                  <NoticeButtons
                    page={this.props.page}
                    index={this.props.index - 2}
                    notice={notice1}
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
