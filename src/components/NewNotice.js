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
  onSubmit: (email, password) =>
    dispatch({ type: "LOGIN", payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: "LOGIN_PAGE_UNLOADED" })
});

class NewNotice extends React.Component {
  constructor() {
    super();
    this.changeTitle = event => this.props.onChangeTitle(event.target.value);
    this.changeDescription = event =>
      this.props.onChangeDescription(event.target.value);
    this.changeBody = event => this.props.onChangeBody(event.target.value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(email, password);
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
          width: "400px",
          boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
          borderRadius: "6px",
          margin: "20px",
          padding: "15px",
          position: "absolute",
          top: "100px",
          zIndex: "50",
          backgroundColor: "white"
        }}
      >
        <h3>Post a Notice</h3>
        <form onSubmit={this.submitForm(title, description, body)}>
          <fieldset>
            <fieldset>
              <input
                type="title"
                placeholder="Enter title here..."
                value={title}
                onChange={this.changeTitle}
              />
            </fieldset>

            <fieldset>
              <input
                type="description"
                placeholder="Enter description here..."
                value={description}
                onChange={this.changeDescription}
              />
            </fieldset>

            <fieldset>
              <input
                type="body"
                placeholder="Enter body here..."
                value={body}
                onChange={this.changeBody}
              />
            </fieldset>

            <button
              type="submit"
              disabled={this.props.inProgress}
            >
              {" "}
              Post Notice
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
