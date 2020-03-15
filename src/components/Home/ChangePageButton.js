import React from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({ pageNumber: state.notices.pageNumber });

const mapDispatchToProps = dispatch => ({
  changePageNumber: payload => dispatch({ type: "CHANGE_PAGE_NUMBER", payload })
});

class ChangePageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      randomTop: 0,
      randomLeft: 0,
      clicked: false
    };

    this.getRndInteger = this.getRndInteger.bind(this);
    this.toggleHoverIn = this.toggleHoverIn.bind(this);
    this.toggleHoverOut = this.toggleHoverOut.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
  }
  toggleHoverIn() {
    this.setState({ hover: true });
  }

  toggleHoverOut() {
    this.setState({ hover: false });
  }

  changePageNumber() {
    this.props.changePageNumber();
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
        backgroundColor: "#96d095",
        color: "#0e460c",
        transform: "translate(0px,3px)",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "1px 1px 4px 1px rgba(176,176,176,0.79)"
      };
    }
    if (this.state.hover) {
      return {
        boxShadow: "2px 2px 7px 3px rgba(176,176,176,0.79)",
        backgroundColor: "#c9eec7",
        color: "#5cb85c"
      };
    } else {
      return {
        backgroundColor: "white",
        color: "#5cb85c"
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
      color: "#5cb85c",
      fontFamily: "titillium web,sans-serif",
      fontSize: "21px",
      padding: "4px",
      borderRadius: "5px",
      position: "relative",
      outline: "none",
      border: "none",
      height: "100%",
      width: "100%"
    };

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0" },
      exiting: { opacity: "1" },
      exited: { opacity: "1" }
    };
    return (
      <Transition in={!this.props.noticesVisible} timeout={duration}>
        {state => (
          <Link to={`/${this.props.pageNumber}`}>
            <button
              onMouseEnter={this.toggleHoverIn}
              onMouseLeave={this.toggleHoverOut}
              style={{ ...defaultButtonStyle, ...this.buttonStyle() }}
              onClick={this.changePageNumber}
              onMouseDown={this.toggleClick}
              onMouseUp={this.toggleClick}
            >
              post a new notice
            </button>{" "}
          </Link>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButton);
