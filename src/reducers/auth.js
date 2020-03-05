export default (state = { loggedIn: false }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        inProgress: false,
        loggedIn: true
      };
    case "REGISTER":
      return {
        ...state,
        inProgress: false,
        loggedIn: true,
        errors: action.error ? action.payload.errors : null
      };
    case "LOGIN_PAGE_UNLOADED":
      return {
        ...state
      };
    case "REGISTER_PAGE_UNLOADED":
      return {};
    case "ASYNC_START":
      if (action.subtype === "LOGIN" || action.subtype === "REGISTER") {
        return { ...state, inProgress: true };
      }
      break;
    case "UPDATE_FIELD_AUTH":
      return { ...state, [action.key]: action.value };
  }

  return state;
};
