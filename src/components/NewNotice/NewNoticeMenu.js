import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";

const mapStateToProps = state => ({
  resize: state.notices.resize,
  newNoticeMenuItem: state.notice.newNoticeMenuItem
});

const mapDispatchToProps = dispatch => ({
  newNoticeMenuItemSelected: payload =>
    dispatch({ type: "NEW_NOTICE_MENU_ITEM_SELECTED", payload })
});

class NewNoticeMenu extends React.Component {
  constructor(props) {
    super();

    this.state = {
      containerWidth: null
    };

    this.menuItemClick = this.menuItemClick.bind(this);
  }

  menuItemClick(ev) {
    this.props.newNoticeMenuItemSelected(ev.target.id);
  }

  itemStyle(id) {
    if (this.props.newNoticeMenuItem === id)
      return {
        backgroundColor: "white",
        color: "#4faa4f",
        border: "none",
        outline: "none"
      };
  }

  render() {
    const itemTypes = ["poster", "event", "discussion", "proclamation", "card"];

    return (
      <div id="new-notice-menu-container" className="new-notice-menu-container">
        <div className="new-notice-menu-flex">
          <div className="new-notice-menu-text" style={{ position: "relative" }}>
            <span id="new-notice-menu-text" style={{ position: "absolute", width: "100%", textAlign: "center", top: "5px" }}>
              pick notice type
            </span>
          </div>
          {itemTypes.map(item => {
            return (
              <button
                onClick={this.menuItemClick}
                id={`new-notice-menu-${item}`}
                className="new-notice-menu-item"
                style={this.itemStyle(`new-notice-menu-${item}`)}
              >
                {`${item}`}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeMenu);
