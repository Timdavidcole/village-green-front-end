import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeTitle: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "title", value }),
  onChangeDescription: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "description", value }),
  onChangeBody: value =>
    dispatch({ type: "UPDATE_FIELD_AUTH", key: "body", value }),
  onSubmit: (title, description, body) =>
    dispatch({
      type: "LOGIN",
      payload: agent.Auth.login(title, description, body)
    }),
  onUnload: () => dispatch({ type: "LOGIN_PAGE_UNLOADED" })
});

class NewNotice extends React.Component {
  constructor() {
    super();
    this.changeTitle = event => this.props.onChangeTitle(event.target.value);
    this.changeDescription = event =>
      this.props.onChangeDescription(event.target.value);
    this.changeBody = event => this.props.onChangeBody(event.target.value);
    this.submitForm = (title, description, body) => event => {
      event.preventDefault();
      this.props.onSubmit(title, description, body);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { title, description, body } = this.props;

    return (
      <div
        style={{
          width: "450px",
          boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
          borderRadius: "6px",
          margin: "20px",
          padding: "10px",
          position: "absolute",
          top: "100px",
          zIndex: "50",
          backgroundColor: "white"
        }}
      >
        <form
          style={{ width: "100%", display: "inline-block" }}
          onSubmit={this.submitForm(title, description, body)}
        >
          <fieldset>
            <label for="title"
              style={{
                color: "#5cb85c",
                fontFamily: "titillium web,sans-serif",
                fontSize: "21px",
                width: "170px",
                padding: "4px",
                position: "relative",
                float: "right",
                bottom: "2px"
              }}
            >
              post a new notice
            </label>
            <input
              style={{
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "21px",
                width: "220px",
                padding: "4px"
              }}
              type="title"
              id="title"
              placeholder="enter title here..."
              value={title}
              onChange={this.changeTitle}
            />

            <input
              style={{
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "18px",
                width: "428px",
                marginTop: "4px",
                padding: "4px"
              }}
              type="description"
              placeholder="enter description here..."
              value={description}
              onChange={this.changeDescription}
            />
            <textarea
              rows="4"
              style={{
                display: "inline",
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "18px",
                width: "360px",
                marginTop: "4px",
                boxShadow: "none",
                padding: "4px"
              }}
              type="body"
              placeholder="enter body here..."
              value={body}
              onChange={this.changeBody}
            />
            <button
              type="submit"
              disabled={this.props.inProgress}
              style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                display: "inline",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#70bf6d",
                color: "white",
                outline: 0,
                verticalAlign: "middle"
              }}
            >
              {" "}
              Post!
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNotice);
