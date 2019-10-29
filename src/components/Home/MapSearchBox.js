import React from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  changeMapCenter: payload => dispatch({ type: "CHANGE_CENTER", payload })
});

class MapSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.getCoords = this.getCoords.bind(this);
  }

  getCoords(place) {
    Geocode.fromAddress(place.formatted_address).then(
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
    );
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
          width: "50%",
          float: "right"
        }}
        onPlaceSelected={place => this.getCoords(place)}
        types={["address"]}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapSearchBox);
