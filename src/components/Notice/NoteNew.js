import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  parentNotice: state.notice.notice
});

const mapDispatchToProps = dispatch => ({
  addNewNotice: payload => dispatch({ type: "ADD_CHILD_NOTICE", payload })
});

class NoteNew extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      image: ""
    };
    this.setTitle = ev => {
      this.setState({ title: ev.target.value });
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
        body: this.state.body,
        image: this.state.image,
        parentNotice: this.props.parentNotice.slug
      })
        .then(notice => {
          this.props.addNewNotice(notice);
        })
        .then(() => {
          this.setState({
            title: "",
            body: "",
            image: ""
          });
        });
    };
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          backgroundColor: "white",
          verticalAlign: "top"
        }}
      >
        <form
          style={{ overflow: "none", position: "relative" }}
          onSubmit={this.createNotice}
        >
          <fieldset className="new-note-form">
            <input
              className="new-note-input"
              type="title"
              id="title"
              maxLength="50"
              style={{ textAlign: "center" }}
              placeholder="enter title here"
              value={this.state.title}
              onChange={this.setTitle}
            />
            <textarea
              className="new-note-input"
              rows="4"
              maxLength="240"
              type="body"
              placeholder="enter body here"
              value={this.state.body}
              onChange={this.setBody}
            />
            <input
              className="new-note-input"
              type="description"
              placeholder="add an image url"
              value={this.state.image}
              onChange={this.setImage}
              style={{ marginBottom: "85px" }}
            />
            <button
              className="new-note-button"
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteNew);
