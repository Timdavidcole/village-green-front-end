const defaultState = {
  centerMap: { lat: 51.508402, lng: -0.126326 },
  centerLocation: "",
  location: ""
};

export default (state = defaultState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CHANGE_CENTER":
      return {
        ...state,
        centerMap: action.payload.coordinates,
        location: action.payload.location
      };
    case "CHANGE_NOTICES":
      return {
        ...state,
        notices: action.payload.notices
      };
  }
  return state;
};
