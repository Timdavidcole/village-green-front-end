import React from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import agent from "../../agent";
import ReactDOM from "react-dom";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  centerMap: state.map.centerMap
});

const mapDispatchToProps = dispatch => ({
  changeMapCenter: payload => dispatch({ type: "CHANGE_CENTER", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
  noticesHidden: () => dispatch({ type: "NOTICES_HIDDEN" }),
  noticesShown: () => dispatch({ type: "NOTICES_SHOWN" }),
  loading: () => dispatch({ type: "LOADING" })
});

class MapSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.getCoords = this.getCoords.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      event.preventDefault();
      this.props.noticesShown();
    }
  };

  getCoords(place) {
    this.props.loading();
    this.props.noticesShown();
    Geocode.fromAddress(place.formatted_address)
      .then(
        response => {
          this.props.changeMapCenter({
            coordinates: {
              lat: response.results[0].geometry.location.lat,
              lng: response.results[0].geometry.location.lng
            },
            location: ""
          });
        },
        error => {
          console.error(error);
        }
      )
      .then(() => {
        this.props.updateUnsortedNotices(
          agent.Notices.all(JSON.stringify(this.props.centerMap))
        );
      });
  }

  onClick() {
    this.props.noticesHidden();
  }

  render() {
    Geocode.setApiKey("AIzaSyB9-449YKR60GMDFtlaiFHJiU3W5MYrPJ4");
    Geocode.setLanguage("en");
    return (
      <Autocomplete
        style={{
          margin: "3px",
          padding: "4px",
          borderRadius: "5px",
          width: "20%",
          float: "right",
          boxShadow: "5px 5px 10px 3px rgba(176,176,176,0.79)",
          visibility: "visible"
        }}
        onPlaceSelected={place => this.getCoords(place)}
        types={["geocode"]}
        location={`${this.props.centerMap.lat},${this.props.centerMap.lng}`}
        placeholder={"Search a location..."}
        onClick={this.onClick}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSearchBox);
