const defaultState = {
  appName: "Village Green",
  token: null,
  centerMap: { lat: 51.508402, lng: -0.126326 }
};

export default (state = defaultState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "APP_LOAD":
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case "REDIRECT":
      return { ...state, redirectTo: null };
    case "LOGOUT":
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case "SETTINGS_SAVED":
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        currentUser: action.error ? null : action.payload.user
      };
    case "CHANGE_CENTER":
      return {
        ...state,
        centerMap: action.payload.coordinates
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case "DELETE_NOTICE":
      return { ...state, redirectTo: "/" };
  }
  return state;
};
