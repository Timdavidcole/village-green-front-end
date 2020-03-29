import NoticeContainerEdit from "./NoticeContainerEdit";
import NoticeContainer from "./NoticeContainer";
import NoteText from "./NoteText";
import NoteImage from "./NoteImage";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/notice.css";
import NoteNew from "./NoteNew";

const mapStateToProps = state => ({
  ...state.notice,
  currentUser: state.common.currentUser,
  editNotice: state.notice.editNotice,
  notice: state.notice.notice,
  childNotices: state.notice.childNotices
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "NOTICE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "NOTICE_PAGE_UNLOADED" }),
  addNoticesWindowDims: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_DIMS", payload })
});

class Notice extends React.Component {
  componentWillMount() {
    this.props.addNoticesWindowDims({
      width: document.body.clientWidth,
      height: document.body.clientHeight
    });
    this.props.onLoad(agent.Notices.childNotices(this.props.match.params.id));
  }

  componentDidUpdate() {
    if (this.props.notice.slug) {
      if (this.props.match.params.id !== this.props.notice.slug) {
        this.props.onLoad(
          agent.Notices.childNotices(this.props.match.params.id)
        );
      }
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.notice) {
      return null;
    }
    return (
      <div className="notice-page">
        {this.props.editNotice ? <NoticeContainerEdit /> : <NoticeContainer />}
        <div className="notes-container">
          {this.props.childNotices.map((notice, i) => {
            if (!notice.image) {
              return <NoteText index={i} notice={notice} key={notice.slug} />;
            } else {
              return <NoteImage index={i} notice={notice} key={notice.slug} />;
            }
          })}
          <NoteNew />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
