import React from "react";
import { connect } from "react-redux";
import "../../styles/newNotice.css";
import NewNoticePoster from "./NewNoticePoster";
import NewNoticeEvent from "./NewNoticeEvent";
import NewNoticeDiscussion from "./NewNoticeDiscussion";
import NewNoticeProclamation from "./NewNoticeBusinessCard";
import NewNoticeBusinessCard from "./NewNoticeBusinessCard";
import NewNoticeMenu from "./NewNoticeMenu";

const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow,
  centerMap: state.map.centerMap,
  newNoticeMenuItem: state.notice.newNoticeMenuItem
});

const mapDispatchToProps = dispatch => ({});

class NewNoticeWindow extends React.Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  visible() {
    if (this.props.showNewNoticeWindow) {
      return {
        visibility: "visible",
        transform: "scale(1)",
        opacity: "1",
        transition: "transform 0.2s ease-in, opacity 0.2s ease-in"
      };
    } else
      return {
        visibility: "hidden",
        opacity: "0",
        transform: "scale(0.1)"
      };
  }

  menuItem() {
    let menuItem = null;
    let menuItemArray = this.props.newNoticeMenuItem.split("-");
    menuItemArray = menuItemArray[menuItemArray.length - 1];
    switch (menuItemArray) {
      case "poster":
        menuItem = <NewNoticePoster />;
        break;
      case "event":
        console.log("EVENT")
        menuItem = <NewNoticeEvent />;
        break;
      case "discussion":
        menuItem = <NewNoticeDiscussion />;
        break;
      case "proclamation":
        menuItem = <NewNoticeProclamation />;
        break;
      case "card":
        menuItem = <NewNoticeBusinessCard />;
        break;
      default:
        menuItem = <NewNoticePoster />;
        break;
    }
    return menuItem;
  }

  render() {
    const defaultStyle = {
      alignItems: "top",
      position: "absolute",
      borderRadius: "10px",
      pointerEvents: "auto",
      boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
      margin: "10px",
      backgroundColor: "transparent",
      width: "60vw",
      height: "80vh",
      zIndex: "19823754928374",
      left: "20%"
    };

    return (
      <div
        style={{
          ...defaultStyle,
          ...this.visible()
        }}
      >
        <NewNoticeMenu />
        {this.menuItem()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeWindow);
