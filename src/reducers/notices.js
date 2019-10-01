export default (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        notices: action.payload.notices,
        noticesCount: action.payload.noticesCount
      };
    case 'HOME_PAGE_UNLOADED':
      return {};
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED':
      return {
        ...state,
        notices: action.payload[1].notices,
        noticesCount: action.payload[1].noticesCount
      };
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {};
  }

  return state;
};