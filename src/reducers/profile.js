import { bindActionCreators } from "redux";

export default (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "PROFILE_PAGE_LOADED":
      console.log(action.payload)
      return {
        ...state,
        profile: action.payload[0].profile
      };
    case "PROFILE_FAVORITES_PAGE_LOADED":
      return {
      };
    case "PROFILE_PAGE_UNLOADED":
    case "PROFILE_FAVORITES_PAGE_UNLOADED":
      return {};
  }

  return state;
};
