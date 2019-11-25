import React from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: "NEW_NOTICE", payload })
});

class NewNotice extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: ""
    }
    this.setTitle = ev => {
      this.setState({ title: ev.target.value });
    };
    this.setDescription = ev => {
      this.setState({ description: ev.target.value });
    };
    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };
    this.createNotice = ev => {
      ev.preventDefault();
      const payload = agent.Notices.create({
        title: this.state.title,
        description: this.state.description,
        body: this.state.body
      });
      this.setState({
        title: "",
        description: "",
        body: ""
      });
      this.props.onSubmit(payload);
    };
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
          onSubmit={this.createNotice}
        >
          <fieldset>
            <div
              style={{
                borderBottom: "1px dashed red"
              }}
            >
              <label
                for="title"
                style={{
                  color: "#5cb85c",
                  fontFamily: "titillium web,sans-serif",
                  fontSize: "21px",
                  width: "200px",
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
                value={this.state.title}
                onChange={this.setTitle}
              />
            </div>
            <input
              style={{
                border: "0px none",
                fontFamily: "titillium web,sans-serif",
                fontSize: "18px",
                width: "428px",
                padding: "4px"
              }}
              type="description"
              placeholder="enter description here..."
              value={this.state.description}
              onChange={this.setDescription}
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
              value={this.state.body}
              onChange={this.setBody}
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
