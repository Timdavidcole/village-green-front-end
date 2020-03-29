import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/noticePreview.css";
import NoticePreviewUser from "../Home/NoticePreviewUser";

const mapStateToProps = state => ({
  noticeWidth: state.notices.noticeWidth
});

const mapDispatchToProps = dispatch => ({});

const NoteImage = props => {
  const notice = props.notice;
  return (
    <div
      id={`noticeCard${this.props.index}`}
      className={"noticeCard"}
      style={{
        padding: "0px",
        backgroundColor: "transparent",
        boxShadow: "none"
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
            style={{
              visibility: "hidden",
              maxWidth: `${props.noticeWidth}px`
            }}
          />
        </div>
        <div
          className="card-back"
          style={{
            width: `${props.noticeWidth}px`,
            backgroundColor: "#e4dfc0",
            padding: "10px",
            minHeight: notice.height
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteImage);
