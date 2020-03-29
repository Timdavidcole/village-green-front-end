import NoticeContainerEdit from "./NoticeContainerEdit";
import NoticeContainer from "./NoticeContainer";
import NoticeChild from "./NoticeChild";
import NoticeChildImage from "./NoticeChildImage";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/notice.css";
import ChildNew from "./ChildNew";

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
    this.props.onLoad(
      Promise.all([agent.Notices.childNotices(this.props.match.params.id)])
    );
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
        {this.props.childNotices.map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticeChild
                index={i}
                notice={notice}
                key={notice.slug}
              />
            );
          } else {
            return (
              <NoticeChildImage
                index={i}
                notice={notice}
                key={notice.slug}
              />
            );
          }
        })}
        <ChildNew />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
