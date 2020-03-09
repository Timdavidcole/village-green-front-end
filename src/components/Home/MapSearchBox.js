import React from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import agent from "../../agent";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  centerMap: state.map.centerMap
});

const mapDispatchToProps = dispatch => ({
  changeMapCenter: payload => dispatch({ type: "CHANGE_CENTER", payload }),
  updateUnsortedNotices: payload =>
    dispatch({ type: "UPDATE_UNSORTED_NOTICES", payload }),
  noticesVisible: () => dispatch({ type: "NOTICES_VISIBLE" })
});

class MapSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.getCoords = this.getCoords.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getCoords(place) {
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
    this.props.noticesVisible();
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
          width: "40%",
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
