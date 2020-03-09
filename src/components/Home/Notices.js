import NoticePreview from "./NoticePreview";
import NoticePreviewImage from "./NoticePreviewImage";
import React from "react";
import NewNoticeButton from "./NewNoticeButton";
import "./noticesGrid.css";
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
        console.log("RESIZE");
        this.setState({ resize: !this.state.resize });
      }, 400);
    });
  }

  addNoticesWindowHeight(height) {
    this.props.addNoticesWindowHeight(height);
  }

  withDimOrNotWithDim() {
    return this.props.sorted ? this.props.noticesWithDim : this.props.notices;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.noticesWithDim.length === this.props.notices.length) {
      return true;
    }
    if (nextProps.sorted) {
      console.log(this.props.noticesWithDim)
      return true;
    }
    if (nextProps.updatedUnsorted && nextProps.noticesWithDim.length === this.props.notices.length) {
      console.log(this.props.noticesWithDim)
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    console.log(this.props.noticesWithDim)
    if (
      (!this.props.sorted &&
        this.props.noticesWithDim.length === this.props.notices.length)
    ) {
      console.log("COMPONENT UPDATING");
      this.props.updateSortedNotices(
        sortByColumn(
          sortByHeight(this.props.noticesWithDim),
          this.props.noticesWindowHeight,
          this.props.loggedIn
        )
      );
    }
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
    return (
      <div
        style={{
          height: "calc(100vh - 114px)",
          width: "auto",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          margin: "0",
          padding: "0",
          border: "none",
          overflow: "hidden",
          opacity: this.props.sorted ? "1" : "0"
        }}
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
        {this.withDimOrNotWithDim().map((notice, i) => {
          if (!notice.image) {
            return (
              <NoticePreview
                page={this.props.page}
                noticesVisible={this.props.noticesVisible}
                index={i + 2}
                indexTrue={i}
                notice={notice}
                key={notice.slug}
              />
            );
          } else {
            return (
              <NoticePreviewImage
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
