import Notices from "../Notices";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.notices
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <Notices notices={props.notices} />
    </div>
  );
};

export default connect(
  mapStateToProps,
  () => ({})
)(MainView);
