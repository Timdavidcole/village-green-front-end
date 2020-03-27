import NoticeMeta from "./NoticeMeta";
import CommentContainer from "./CommentContainer";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/notice.css";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
});

class NoticeContainer extends React.Component {

  noticeImage() {
    return this.props.notice.image ? (
      <div className="notice-image-container">
        <img className="notice-image" src={this.props.notice.image}></img>
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
            <div className="notice-title-container">
              <h1>{this.props.notice.title}</h1>
            </div>
          </div>
          <div className="notice-description-container">
            <h4>{this.props.notice.description}</h4>
          </div>
          <div className="notice-body-container">
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
          </div>
          <NoticeMeta notice={this.props.notice} canModify={canModify} />
        </div>
        {this.noticeImage()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeContainer);
