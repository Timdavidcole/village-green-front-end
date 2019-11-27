import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

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
    return (
      <div
        className="div1"
        style={{
          boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
          borderRadius: "6px",
          margin: "10px",
          padding: "10px",
          zIndex: "50",
          backgroundColor: "white"
        }}
      >
        <form
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "inline-block"
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
                width: "80%",
                marginTop: "4px",
                boxShadow: "none",
                padding: "4px",
                height: "calc(100% - 86px)",
                width: "80%"
              }}
              type="body"
              placeholder="enter body here..."
              value={this.state.body}
              onChange={this.setBody}
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
          >
            {" "}
            Post!
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNotice);
