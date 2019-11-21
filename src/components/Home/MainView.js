import Notices from "../Notices";
import NewNotice from "../NewNotice";

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.notices
});

const MainView = props => {
  return (
    <div>
      <NewNotice />
      <Notices notices={props.notices} />
    </div>
  );
};

export default connect(
  mapStateToProps,
  () => ({})
)(MainView);
