export default (state = { notices: [], noticesVisible: true }, action) => {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return {
        ...state,
        notices: action.payload.notices,
        noticesCount: action.payload.noticesCount
      };
    case "NEW_NOTICE":
      return {
        ...state,
        noticeErrors: action.error ? action.payload.errors : null,
        notices: action.error
          ? null
          : [action.payload.notice].concat(state.notices || [])
      };
    case "CHANGE_NOTICES":
      return {
        ...state,
        notices: action.payload.notices,
        noticesVisible: true
      };
    case "NOTICES_VISIBLE":
      return {
        ...state,
        noticesVisible: false
      };
    case "HOME_PAGE_UNLOADED":
      return {};
    case "UPDATE_NOTICE":
      return {
        ...state,
        notices: action.payload
      };
  }

  return state;
};
