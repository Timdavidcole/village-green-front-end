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

class NewNoticePoster extends React.Component {
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
          width: "80%",
          padding: "10%"
        }}
      >
        <div>
          <ExitButton onClick={this.props.hideNewNoticeWindow} />
        </div>

        <form onSubmit={this.createNotice}>
          <fieldset>
            <label>post a new notice</label>
            <div>
              <input
                type="title"
                id="title"
                placeholder="enter title here..."
                value={this.state.title}
                onChange={this.setTitle}
              />
            </div>
            <input
              type="description"
              placeholder="enter description here..."
              value={this.state.description}
              onChange={this.setDescription}
            />
            <textarea
              type="body"
              placeholder="enter body here..."
              value={this.state.body}
              onChange={this.setBody}
            />
            <input
              type="description"
              placeholder="enter image url here..."
              value={this.state.image}
              onChange={this.setImage}
            />
          </fieldset>
          <button
            type="submit"
            disabled={this.props.inProgress}
            onClick={this.props.hideNewNoticeWindow}
          >
            Post!
          </button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticePoster);
