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
          width: "600px",
          boxShadow: "3px 3px 8px #cfcfcf",
          borderRadius: "6px",
          margin: "10px",
          padding: "5px"
        }}
      >
        <h3>Post a Notice</h3>
        <form onSubmit={this.submitForm(title, description, body)}>
          <fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="title"
                placeholder="Enter title here..."
                value={title}
                onChange={this.changeTitle}
              />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="description"
                placeholder="Enter description here..."
                value={description}
                onChange={this.changeDescription}
              />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="body"
                placeholder="Enter body here..."
                value={body}
                onChange={this.changeBody}
              />
            </fieldset>

            <button
              className="btn btn-lg btn-primary pull-xs-right"
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
