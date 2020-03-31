import NoticeMeta from "./NoticeMeta";
import React from "react";
import { connect } from "react-redux";
import "../../styles/notice.css";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({});

class NoticeContainer extends React.Component {
  noticeImage() {
    return this.props.notice.image ? (
      <div className="notice-image-container">
        <img alt="notice" className="notice-image" src={this.props.notice.image}></img>
      </div>
    ) : null;
  }

  render() {
    if (!this.props.notice) {
      return null;
    }
    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.notice.author.username;
    return (
      <div className="notice-container">
        <div className="notice-details">
          <div className="notice-banner">
            <h1>{this.props.notice.title}</h1>
          </div>
          <div className="notice-description">
            <h4>{this.props.notice.description}</h4>
          </div>
          <div className="notice-body">
            {this.props.notice.body.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </div>
          <NoticeMeta notice={this.props.notice} canModify={canModify} />
        </div>
        {this.noticeImage()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeContainer);
