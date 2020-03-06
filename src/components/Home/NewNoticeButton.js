import React from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";

const mapStateToProps = state => ({ ...state.notice });

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch({ type: "DISPLAY_NEW_NOTICE" })
});

class NewNoticeButton extends React.Component {
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
    this.openNewNotice = this.openNewNotice.bind(this)
  }
  toggleHoverIn() {
    this.setState({ hover: true });
  }

  toggleHoverOut() {
    this.setState({ hover: false });
  }

  componentDidMount() {
    if (this.props.page !== "pinned") {
      this.setState({
        randomTop: this.getRndInteger(-5, 5),
        randomLeft: this.getRndInteger(-5, 5)
      });
    }
  }

  openNewNotice () {
    this.props.onClick()
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

    const defaultBoxStyle = {
      boxShadow: "5px 10px 20px 3px rgba(176,176,176,0.79)",
      borderRadius: "6px",
      margin: "10px",
      padding: "15px",
      backgroundColor: "white",
      position: "relative",
      transition: `opacity 0.2s linear`,
      opacity: "1",
      zIndex: "5000",
      top: `${this.state.randomTop}px`,
      left: `${this.state.randomLeft}px`,
      pointerEvents: "auto",
      height: "250px"
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
          <div
            className="div1"
            style={{
              ...defaultBoxStyle,
              ...transitionStyles[state]
            }}
          >
            <button
              onMouseEnter={this.toggleHoverIn}
              onMouseLeave={this.toggleHoverOut}
              style={{ ...defaultButtonStyle, ...this.buttonStyle() }}
              onClick={this.openNewNotice}
              onMouseDown={this.toggleClick}
              onMouseUp={this.toggleClick}
            >
              post a new notice
            </button>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoticeButton);
