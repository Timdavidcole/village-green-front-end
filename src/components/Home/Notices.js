import React from "react";
import "./noticesGrid.css";
import { connect } from "react-redux";
import NoticesPage from "./NoticesPage";

const mapStateToProps = state => ({
  noticesWindowHeight: state.notices.noticesWindowHeight,
  noticesWindowWidth: state.notices.noticesWindowWidth,
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
    dispatch({ type: "UPDATE_SORTED_NOTICES", payload }),
  removeLastNotice: payload => dispatch({ type: "REMOVE_LAST_NOTICE", payload })
});

class Notices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: false
    };
  }

  withDimOrNotWithDim() {
    return this.props.sorted ? this.props.noticesWithDim : this.props.notices;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.noticesWithDim.length === this.props.notices.length) {
      return true;
    }
    if (nextProps.sorted) {
      console.log(nextProps.sorted);
      return true;
    }
    if (
      nextProps.updatedUnsorted &&
      this.props.noticesWithDim.length === this.props.notices.length
    ) {
      return true;
    }
    return false;
  }

  render() {

    if (this.props.notices.length === 0) {
      return (
        <div className="parent">
          <div className="article-preview">Loading notices... </div>
        </div>
      );
    }
    return (
      <div>
        {this.withDimOrNotWithDim().map((noticesPage, i) => {
          return <NoticesPage indexPage={i} key={i} />;
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
