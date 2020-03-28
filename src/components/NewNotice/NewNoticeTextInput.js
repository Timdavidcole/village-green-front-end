import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import "../../styles/newNotice.css";
import ExitButton from "./ExitButton";

const mapStateToProps = state => ({
  showNewNoticeWindow: state.notice.showNewNoticeWindow,
  centerMap: state.map.centerMap
});

const mapDispatchToProps = dispatch => ({
  addNewNotice: payload => dispatch({ type: "ADD_NEW_NOTICE", payload }),
  hideNewNoticeWindow: () => dispatch({ type: "HIDE_NEW_NOTICE" })
});

class NewNoticeTextInput extends React.Component {
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
      agent.Notices.create({
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        image: this.state.image
      })
        .then(notice => {
          this.props.addNewNotice(notice);
        })
        .then(() => {
          this.setState({
            title: "",
            description: "",
            body: "",
            image: ""
          });
        });
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          backgroundColor: "white",
          verticalAlign: "top",
          height: "100%",
          paddingTop: "15%",
          paddingLeft: "10%",
          paddingRight: "10%",
          width: "calc(100% - 155px)",
          overflow: "none"
        }}
      >
        <div
          style={{
            fontFamily: "titillium web, sans-serif",
            fontSize: "1.3rem",
            textAlign: "center",
            position: "absolute",
            width: "auto",
            color: "#4faa4f",
            top: "62px",
            left: "160px"
          }}
        >
          post a new notice
        </div>

        <div>
          <ExitButton onClick={this.props.hideNewNoticeWindow} />
        </div>

        <form
          style={{ overflow: "none", position: "relative" }}
          onSubmit={this.createNotice}
        >
          <fieldset className="new-notice-form">
            <input
              className="new-notice-input"
              type="title"
              id="title"
              maxLength="50"
              style={{ textAlign: "center" }}
              placeholder="enter title here"
              value={this.state.title}
              onChange={this.setTitle}
            />
            <input
              className="new-notice-input"
              type="description"
              maxLength="75"
              style={{ textAlign: "center" }}
              placeholder="enter description here"
              value={this.state.description}
              onChange={this.setDescription}
            />
            <textarea
              className="new-notice-input"
              rows="4"
              maxLength="240"
              type="body"
              placeholder="enter body here"
              value={this.state.body}
              onChange={this.setBody}
            />
            <input
              className="new-notice-input"
              type="description"
              placeholder="enter optional image url here"
              value={this.state.image}
              onChange={this.setImage}
              style={{ marginBottom: "85px" }}
            />
            <button
              className="post-button"
              type="submit"
              disabled={this.props.inProgress}
              onClick={this.props.hideNewNoticeWindow}
            >
              post!
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeTextInput);
