export default (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "PROFILE_PAGE_LOADED":
    case "PROFILE_FAVORITES_PAGE_LOADED":
      return {
      };
    case "PROFILE_PAGE_UNLOADED":
    case "PROFILE_FAVORITES_PAGE_UNLOADED":
      return {};
  }

  return state;
};
