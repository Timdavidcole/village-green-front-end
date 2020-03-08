export default (
  state = {
    notices: [],
    noticesWithDim: [],
    noticesVisible: true,
    pinnedEvent: false,
    noticesCount: 0,
    sorted: false
  },
  action
) => {
  // eslint-disable-next-line default-case
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
    case "NOTICES_VISIBLE":
      return {
        ...state,
        noticesVisible: false
      };
    case "HOME_PAGE_UNLOADED":
      return {};
    case "PIN_NOTICE":
      return {
        ...state,
        noticesWithDim: action.payload,
        pinnedEvent: true
      };
    case "ADD_PINNED_EVENT":
      return {
        ...state,
        pinnedEvent: true
      };
    case "REMOVE_PINNED_EVENT":
      return {
        ...state,
        pinnedEvent: false
      };
    case "LOAD_DIV_DIMENSIONS":
      return {
        ...state,
        noticesWithDim: [...state.noticesWithDim, action.payload]
      };

    case "ADD_NOTICES_WINDOW_HEIGHT":
      return {
        ...state,
        noticesWindowHeight: action.payload
      };
    case "UPDATE_SORTED_NOTICES":
      return {
        ...state,
        noticesWithDim: action.payload,
        sorted: true,
        noticesVisible: true
      };
    case "UPDATE_UNSORTED_NOTICES":
      return {
        ...state,
        notices: action.payload.notices,
        noticesCount: action.payload.noticesCount,
        noticesWithDim: [],
        sorted: false,
        pinnedEvent: false
      };
    case "LOG_OUT_NOTICES":
      return {
        notices: [],
        noticesWithDim: [],
        noticesVisible: true,
        pinnedEvent: false,
        noticesCount: 0,
        sorted: false
      };
  }

  return state;
};
