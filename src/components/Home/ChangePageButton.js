import React from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import "../../styles/notices.css";

const mapStateToProps = state => ({
  pageNumber: state.notices.pageNumber,
  noticesHidden: state.notices.noticesHidden,
  notices: state.notices.notices
});

const mapDispatchToProps = dispatch => ({
  updatePageNumber: payload =>
    dispatch({ type: "UPDATE_PAGE_NUMBER", payload }),
  startPageNumberAnimation: payload =>
    dispatch({ type: "START_PAGE_NUMBER_ANIMATION", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload })
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
    this.setState({ hover: true });
  }

  toggleHoverOut() {
    this.setState({ hover: false });
  }

  changePageNumber() {
    this.props.startPageNumberAnimation(this.props.direction);
    setTimeout(() => {
      if (this.props.direction === "up" && this.props.pageNumber === 2) {
        this.props.updateUnsortedNotices({ notices: this.props.notices });
      }
      this.props.updatePageNumber({
        direction: this.props.direction,
        pageNumber:
          this.props.direction === "up"
            ? this.props.pageNumber - 1
            : this.props.pageNumber + 1
      });
    }, 120);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  toggleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const duration = {
      appear: 100,
      enter: 100,
      exit: 100
    };

    const transitionStyles = {
      entering: { opacity: "0" },
      entered: { opacity: "0" },
      exiting: { opacity: "1" },
      exited: { opacity: "1" }
    };

    return (
      <Transition in={this.props.noticesHidden} timeout={duration}>
        {state => (
          <div
            className={`${this.props.direction}-arrow-container`}
            onMouseEnter={this.toggleHoverIn}
            onMouseLeave={this.toggleHoverOut}
          >
            <button
              className="change-page-button"
              style={{
                ...transitionStyles[state]
              }}
              onClick={this.changePageNumber}
              onMouseDown={this.toggleClick}
              onMouseUp={this.toggleClick}
            >
              <i className={`${this.props.direction}-arrow-icon`}></i>
            </button>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButton);
