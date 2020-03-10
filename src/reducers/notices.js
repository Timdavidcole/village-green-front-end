export default (
  state = {
    notices: [[]],
    noticesWithDim: [[]],
    noticesVisible: true,
    pinnedEvent: false,
    noticesCount: null,
    sorted: false,
    updatedUnsorted: false,
    noticesWithDimsIDs: []
  },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return {
        ...state,
        notices: [[...action.payload.notices]],
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
    case "LOAD_DIV_DIMENSIONS":
      console.log(action.payload.newNotices)
      if (!state.noticesWithDimsIDs.includes(action.payload.newNoticeId)) {
        return {
          ...state,
          noticesWithDim: action.payload.newNotices,
          noticesWithDimsIDs: [
            ...state.noticesWithDimsIDs,
            action.payload.newNoticeId
          ]
        };
      } else return { ...state };
    case "MOVE_LAST_NOTICE":
      return {
        ...state,
        noticesWithDim: action.payload
      };
    case "ADD_NOTICES_WINDOW_HEIGHT":
      return {
        ...state,
        noticesWindowWidth: action.payload.width,
        noticesWindowHeight: action.payload.height,
        sorted: false,
        pinnedEvent: false
      };
    case "UPDATE_SORTED_NOTICES":
      return {
        ...state,
        noticesWithDim: action.payload,
        sorted: true,
        noticesVisible: true,
        updatedUnsorted: false
      };
    case "UPDATE_UNSORTED_NOTICES":
      return {
        ...state,
        notices: [[...action.payload.notices]],
        noticesCount: action.payload.noticesCount,
        noticesWithDim: [[]],
        noticesWithDimsIDs: [],
        sorted: false,
        pinnedEvent: false,
        updatedUnsorted: true,
        noticesVisible: true
      };
    case "LOG_OUT_NOTICES":
      return {
        notices: [[]],
        noticesWithDim: [[]],
        noticesWithDimsIDs: [],
        noticesVisible: true,
        pinnedEvent: false,
        noticesCount: 0,
        sorted: false
      };
  }

  return state;
};
