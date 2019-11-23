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
            <fieldset>
              <span
                style={{
                  color: "#5cb85c",
                  fontFamily: "titillium web,sans-serif",
                  fontSize: "21px",
                  width: "170px",
                  top: "1px",
                  position: "relative"
                }}
              >
                post a new notice
              </span>
              <input
                style={{
                  border: "0px none",
                  fontFamily: "titillium web,sans-serif",
                  fontSize: "21px",
                  float: "right",
                  width: "220px"
                }}
                type="title"
                placeholder="enter title here..."
                value={title}
                onChange={this.changeTitle}
              />
            </fieldset>

            <fieldset>
              <input
                style={{
                  border: "0px none",
                  fontFamily: "titillium web,sans-serif",
                  fontSize: "18px",
                  width: "350px"
                }}
                type="description"
                placeholder="enter description here..."
                value={description}
                onChange={this.changeDescription}
              />
            </fieldset>

            <fieldset>
              <textarea
                style={{
                  border: "0px none",
                  fontFamily: "titillium web,sans-serif",
                  fontSize: "18px",
                  width: "350px",
                  boxShadow: 'none',
                }}
                type="body"
                placeholder="enter body here..."
                value={body}
                onChange={this.changeBody}
              />
            </fieldset>

            <button
              type="submit"
              disabled={this.props.inProgress}
              style={{
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#70bf6d",
                color: "white",
                outline: 0,
                float: "right"
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
