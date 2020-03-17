import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "../../styles/newNotice.css";
import NewNoticeText from './NewNoticeText';
import NewNoticeSelector from './NewNoticeSelector'


const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow,
  centerMap: state.map.centerMap
});

const mapDispatchToProps = dispatch => ({
  hideNewNoticeWindow: () => dispatch({ type: "HIDE_NEW_NOTICE" })
});

class NewNoticeWindow extends React.Component {

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      if (this.props.showNewNoticeWindow) {
        event.preventDefault();
      }
      this.props.hideNewNoticeWindow();
    }
  };

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

  render() {
    const defaultStyle = {
      position: "absolute",
      pointerEvents: "auto",
      boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
      borderRadius: "6px",
      margin: "10px",
      padding: "10px",
      backgroundColor: "white",
      width: "60vw",
      height: "80vh",
      zIndex: "19823754928374",
      display: "inline-block",
      left: "20%"
    };

    return (
      <div
        style={{
          ...defaultStyle,
          ...this.visible()
        }}
      >
        <NewNoticeSelector />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeWindow);
