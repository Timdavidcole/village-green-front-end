import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "../../styles/newNotice.css";
import ExitButton from "./ExitButton";

const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow
});

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: "NEW_NOTICE", payload }),
  hideNewNoticeWindow: () => dispatch({ type: "HIDE_NEW_NOTICE" })
});

class NewNotice extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      image: ""
    };
    this.setTitle = ev => {
      this.setState({ title: ev.target.value });
    };
    this.setDescription = ev => {
      this.setState({ description: ev.target.value });
    };
    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };
    this.setImage = ev => {
      this.setState({ image: ev.target.value });
    };
    this.createNotice = ev => {
      ev.preventDefault();
      const payload = agent.Notices.create({
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        image: this.state.image
      });
      this.setState({
        title: "",
        description: "",
        body: "",
        image: ""
      });
      this.props.onSubmit(payload);
    };
  }

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
      height: "60vh",
      zIndex: "5100",
      display: "inline-block",
      left: "0px"

    };

    return (
      <div
        style={{
          ...defaultStyle,
          ...this.visible()
        }}
      >
        <div
          style={{ textAlign: "right", position: "relative", width: "100%" }}
        >
          <ExitButton onClick={this.props.hideNewNoticeWindow} />
        </div>

        <form
          style={{
            position: "relative",
            height: "93%",
            width: "100%"
          }}
          onSubmit={this.createNotice}
        >
          <fieldset
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <label
              for="title"
              style={{
                color: "#5cb85c",
                fontFamily: "titillium web,sans-serif",
                fontSize: "21px",
                padding: "4px",
                position: "absolute",
                right: "0px"
              }}
            >
              post a new notice
            </label>
            <div
              style={{
                borderBottom: "1px dashed red"
              }}
            >
              <input
                style={{
                  border: "0px none",
                  fontFamily: "titillium web,sans-serif",
                  fontSize: "21px",
                  padding: "4px",
                  width: "60%"
                }}
                type="title"
                id="title"
                placeholder="enter title here..."
                value={this.state.title}
                onChange={this.setTitle}
              />
            </div>
            <input
              style={{
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "18px",
                width: "100%",
                padding: "4px"
              }}
              type="description"
              placeholder="enter description here..."
              value={this.state.description}
              onChange={this.setDescription}
            />
            <textarea
              style={{
                display: "inline",
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "18px",
                marginTop: "4px",
                boxShadow: "none",
                padding: "4px",
                height: "calc(100% - 140px)",
                width: "calc(100% - 70px)"
              }}
              type="body"
              placeholder="enter body here..."
              value={this.state.body}
              onChange={this.setBody}
            />
            <input
              style={{
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "18px",
                width: "calc(100% - 70px)",
                padding: "4px",
                margin: "4px"
              }}
              type="description"
              placeholder="enter image url here..."
              value={this.state.image}
              onChange={this.setImage}
            />
          </fieldset>
          <button
            type="submit"
            disabled={this.props.inProgress}
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              display: "inline",
              padding: "10px",
              margin: "5px",
              borderRadius: "10px",
              backgroundColor: "#70bf6d",
              color: "white",
              outline: 0,
              verticalAlign: "middle"
            }}
            onClick={this.props.hideNewNoticeWindow}
          >
            Post!
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNotice);
