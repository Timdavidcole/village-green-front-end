import NoticeMeta from "./NoticeMeta";
import CommentContainer from "./CommentContainer";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import marked from "marked";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" })
});

class Notice extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Notices.get(this.props.match.params.id),
        agent.Comments.forNotice(this.props.match.params.id)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.notice) {
      return null;
    }
    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.notice.author.username;
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.notice.title}</h1>
            <NoticeMeta notice={this.props.notice} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
            {this.props.notice.body.split('\n').map((item, key) => {
              return <span key={key}>{item}<br/></span>
            })}

              <ul className="tag-list">
                {this.props.notice.tagList.map(tag => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions"></div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice);
