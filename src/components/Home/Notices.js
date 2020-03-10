import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "../../styles/noticesGrid.css";
import { connect } from "react-redux";
import sortByHeight from "../../models/sortByHeight";
import sortByColumn from "../../models/sortByColumn";

const mapStateToProps = state => ({
  noticesWindowHeight: state.notices.noticesWindowHeight,
  noticesCount: state.notices.noticesCount,
  notices: state.notices.notices,
  noticesWithDim: state.notices.noticesWithDim,
  noticesVisible: state.notices.noticesVisible,
  sorted: state.notices.sorted,
  loggedIn: state.auth.loggedIn,
  updatedUnsorted: state.notices.updatedUnsorted
});

const mapDispatchToProps = dispatch => ({
  addNoticesWindowHeight: payload =>
    dispatch({ type: "ADD_NOTICES_WINDOW_HEIGHT", payload }),
  updateSortedNotices: payload =>
    dispatch({ type: "UPDATE_SORTED_NOTICES", payload })
});

class Notices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: false
    };
  }

  componentDidMount() {
    var doit;
    window.addEventListener("resize", () => {
      clearTimeout(doit);
      doit = setTimeout(() => {
        this.setState({ resize: !this.state.resize });
      }, 400);
    });
  }

  addNoticesWindowHeight(height) {
    this.props.addNoticesWindowHeight(height);
  }

  componentDidUpdate() {
    if (this.checkNoticesDimensions() && !this.props.sorted) {
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.notices),
          this.props.noticesWindowHeight,
          this.props.loggedIn
        )
      );
    }
  }

  checkNoticesDimensions(){
    var allDimsUpdated = true
    this.props.notices.forEach((notice)=> {
      if(!notice.height || !notice.width){
        allDimsUpdated = false
      }
    })
    return allDimsUpdated
  }

  render() {
    if (!this.props.notices) {
      return (
        <div className="parent">
          <div className="article-preview">Loading...</div>
        </div>
      );
    }

    if (this.props.notices.length === 0) {
      return (
        <div className="parent">
          <div className="article-preview">No notices are here... yet.</div>
        </div>
      );
    }
    var orderFlex = 1
    return (
      <div
        className="parent"
        ref={el => {
          if (
            (el && !this.props.noticesWindowHeight) ||
            (el && this.props.noticesWindowHeight !== el.offsetHeight)
          ) {
            this.addNoticesWindowHeight(el.offsetHeight);
          }
        }}
      >
        {this.props.loggedIn ? (
          <NewNoticeButton noticesVisible={this.props.noticesVisible} />
        ) : null}
        {this.props.notices.map((notice, i) => {
          if (!notice.image) {
            orderFlex === 5 ? orderFlex = 1 : orderFlex ++
            return (
              <NoticePreview
                order={orderFlex}
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexTrue={i}
                notice={notice}
                key={notice.slug}
              />
            );
          } else {
            orderFlex === 5 ? orderFlex = 1 : orderFlex ++
            return (
              <NoticePreviewImage
                order={orderFlex}
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexTrue={i}
                notice={notice}
                key={notice.slug}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
