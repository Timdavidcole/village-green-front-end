export default (
  state = {
    notices: [],
    noticesSorted: [],
    noticesVisible: true,
    noticesCount: null,
    sorted: false,
    updatedUnsorted: false,
    noticesWindowDims: { height: null, width: null },
    waitTillDimUpdate: true,
    newNotice: null,
    newNoticeArrange: false,
    pageNumber: 1,
    loading: true,
    columnsCount: "4",
    noticesHidden: false,
    noticeWidth: "240",
    mapBlur: true,
    noticesY: 0,
  },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return {
        ...state,
        noticesSorted: [],
        notices: [...action.payload.notices],
        sorted: false,
        updatedUnsorted: true,
        noticesVisible: false,
        update: true,
        newNoticeArrange: false,
        loading: true,
        pageNumber: 1,
        noticesHidden: false,
      };
    case "ADD_NEW_NOTICE":
      return {
        ...state,
        noticeErrors: action.error ? action.payload.errors : null,
        newNotice: action.payload.notice,
        newNoticeArrange: true,
        sorted: false,
        pageNumber: 1,
      };
    case "NEW_NOTICE_DISPLAYED":
      return {
        ...state,
        newNotice: [],
        newNoticeArrange: false,
      };
    case "NOTICES_VISIBLE":
      return {
        ...state,
        noticesVisible: false,
        loading: true,
        mapBlur: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
        noticesVisible: false,
        mapBlur: false,
      };
    case "NOTICES_HIDDEN":
      if (action.payload === "toggle") {
        return {
          ...state,
          noticesHidden: !state.noticesHidden,
          mapBlur: !state.mapBlur,
        };
      } else {
        return {
          ...state,
          noticesHidden: true,
          mapBlur: false,
        };
      }
    case "NOTICES_SHOWN":
      return {
        ...state,
        noticesHidden: false,
        mapBlur: true,
      };
    case "UPDATE_NOTICE_WIDTH":
      return {
        ...state,
        noticeWidth: action.payload,
      };
    case "HOME_PAGE_UNLOADED":
      return {};
    case "LOAD_DIV_DIMENSIONS":
      const newNotices1 = [...state.notices];
      const newNotice1 = {
        ...newNotices1[action.payload.index],
        height: action.payload.height,
        width: action.payload.width,
      };
      newNotices1[action.payload.index] = newNotice1;
      return {
        ...state,
        notices: newNotices1,
        noticesVisible: false,
      };
    case "ADD_NOTICES_WINDOW_DIMS":
      return {
        ...state,
        noticesWindowDims: action.payload,
        sorted: false,
        resize: false,
        update: true,
        waitTillDimUpdate: false,
        noticesVisible: false,
      };
    case "UPDATE_SORTED_NOTICES":
      return {
        ...state,
        noticesSorted: [...action.payload],
        sorted: true,
        mapBlur: true,
        noticesVisible: true,
        updatedUnsorted: false,
        update: false,
        waitTillDimUpdate: true,
        newNoticeArrange: false,
        sortDelete: false,
        loading: false,
        pageNumberChanged: false,
        noticesHidden: false,
      };
    case "RESIZE":
      return {
        ...state,
        resize: true,
        update: true,
        sorted: false,
        waitTillDimUpdate: true,
        pageNumber: 1,
        loading: true,
        mapBlur: false,
      };
    case "CHANGE_NOTICES_Y":
      return {
        ...state,
        noticesY: action.payload,
      };
    case "UPDATE_COLUMNS_COUNT":
      return {
        ...state,
        columnsCount: action.payload,
      };
    case "UPDATE_PAGE_NUMBER":
      if (
        action.payload.pageNumber > 0 &&
        action.payload.pageNumber <= state.noticesSorted.length
      ) {
        return {
          ...state,
          pageNumber: action.payload.pageNumber,
          pageNumberChanged: true,
          pageChangeDirection: action.payload.direction,
        };
      } else return { ...state };

    case "START_PAGE_NUMBER_ANIMATION":
      return {
        ...state,
        pageNumberAnimation: true,
        pageChangeDirection: action.payload,
      };
    case "STOP_PAGE_NUMBER_ANIMATION":
      return {
        ...state,
        pageNumberAnimation: false,
      };
    case "UPDATE_UNSORTED_NOTICES":
      return {
        ...state,
        noticesSorted: [],
        notices: [...action.payload.notices],
        sorted: false,
        updatedUnsorted: true,
        noticesVisible: false,
        update: true,
        newNoticeArrange: false,
        loading: true,
        pageNumber: 1,
        noticesHidden: false,
      };
    case "PINNED_PAGE_LOADED":
      return {
        ...state,
        noticesVisible: true,
        pinned: true,
      };
    case "LOGOUT":
      return {
        ...state,
        notices: [],
        noticesSorted: [],
      };
  }

  return state;
};
