import React from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import "../../styles/notices.css";

const mapStateToProps = state => ({
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible
});

const mapDispatchToProps = dispatch => ({
  updatePageNumber: payload => dispatch({ type: "UPDATE_PAGE_NUMBER", payload })
});

class ChangePageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      clicked: false
    };

    this.getRndInteger = this.getRndInteger.bind(this);
    this.toggleHoverIn = this.toggleHoverIn.bind(this);
    this.toggleHoverOut = this.toggleHoverOut.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
  }
  toggleHoverIn() {
    console.log("hover in");
    this.setState({ hover: true });
  }

  toggleHoverOut() {
    this.setState({ hover: false });
  }

  changePageNumber() {
    this.props.updatePageNumber(
      this.props.direction === "up"
        ? this.props.pageNumber - 1
        : this.props.pageNumber + 1
    );
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  toggleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  buttonStyle() {
    if (this.state.clicked) {
      return {
        backgroundColor: "#6bbf87",
        color: "#0e460c",
        boxShadow: "0px 0.5px 5px 0px rgb(0, 0, 0)",
        borderRadius: "10px"
      };
    }
    if (this.state.hover) {
      return {
        boxShadow: "0px 1px 5px 0px rgb(106, 106, 106)",
        backgroundColor: "#d8ebd9",
        color: "#5cb85c",
        borderRadius: "10px"
      };
    } else {
      return {
        color: "#5cb85c",
        transform: "scale(1.0, 1.0)",
        boxShadow: "0px 1px 5px 0px rgb(106, 106, 106)"
      };
    }
  }

  render() {
    const duration = {
      appear: 100,
      enter: 100,
      exit: 100
    };

    const defaultButtonStyle = {
      backgroundColor: "white",
      fontFamily: "titillium web,sans-serif",
      fontSize: "21px",
      padding: "4px",
      position: "relative",
      borderRadius: "10px",
      outline: "none",
      border: "none",
      opacity: "1",
      width: "40%",
      left: "30%",
      pointerEvents: "all",
      transition: "transform 0.2s, box-shadow 0.2s, border-radius 0.2s"
    };

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0" },
      exiting: { opacity: "1" },
      exited: { opacity: "1" }
    };
    console.log(`${this.props.direction}-arrow-container`);
    return (
      <Transition in={!this.props.noticesVisible} timeout={duration}>
        {state => (
          <div
            className={`${this.props.direction}-arrow-container`}
            onMouseEnter={this.toggleHoverIn}
            onMouseLeave={this.toggleHoverOut}
          >
            <button
              style={{
                ...defaultButtonStyle,
                ...this.buttonStyle(),
                ...transitionStyles[state]
              }}
              onClick={this.changePageNumber}
              onMouseDown={this.toggleClick}
              onMouseUp={this.toggleClick}
            >
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "0px",
                  marginTop: "0px",
                  pointerEvents: "all"
                }}
              >
                <i className={`${this.props.direction}-arrow-icon`}></i>
              </div>
            </button>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButton);
