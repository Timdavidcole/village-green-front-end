import React from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import "../../styles/notices.css";

const mapStateToProps = state => ({
  pageNumber: state.notices.pageNumber,
  noticesVisible: state.notices.noticesVisible
});

const mapDispatchToProps = dispatch => ({
  changePageNumber: payload => dispatch({ type: "CHANGE_PAGE_NUMBER", payload })
});

class ChangePageDownButton extends React.Component {
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
        backgroundColor: "#6bbf87",
        color: "#0e460c",
        boxShadow: "0px 0.5px 5px 0px rgb(0, 0, 0)",
        width: "40%",
        left: "30%",
        borderRadius: "10px"
      };
    }
    if (this.state.hover) {
      return {
        backgroundColor: "#d8ebd9",
        boxShadow: "0px 1px 5px 0px rgb(106, 106, 106)",
        color: "#5cb85c",
        width: "60%",
        left: "20%",
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
      width: "100%",
      left: "0%",
      transition:
        "transform 0.2s, box-shadow 0.2s, width 0.2s, left 0.2s, border-radius 0.2s"
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
            <div
              className="down-arrow-container"
              onMouseEnter={this.toggleHoverIn}
              onMouseLeave={this.toggleHoverOut}
            >
              <button
                style={{ ...defaultButtonStyle, ...transitionStyles[state] }}
                onClick={this.changePageNumber}
                onMouseDown={this.toggleClick}
                onMouseUp={this.toggleClick}
              >
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "0px",
                    marginTop: "0px"
                  }}
                >
                  <i className="down-arrow-icon"></i>
                </div>
              </button>
            </div>
          </Link>
        )}
      </Transition>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePageDownButton);
