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
    loading: true
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
    case "ADD_NEW_NOTICE":
      return {
        ...state,
        noticeErrors: action.error ? action.payload.errors : null,
        newNotice: action.payload.notice,
        newNoticeArrange: true,
        sorted: false,
        pageNumber: 1
      };
    case "NEW_NOTICE_DISPLAYED":
      return {
        ...state,
        newNotice: [],
        newNoticeArrange: false
      };
    case "NOTICES_VISIBLE":
      return {
        ...state,
        noticesVisible: false
      };
    case "NOTICES_VISIBLE":
      return {
        ...state,
        loading: true
      };
    case "HOME_PAGE_UNLOADED":
      return {};
    case "LOAD_DIV_DIMENSIONS":
      const newNotices1 = [...state.notices];
      const newNotice1 = {
        ...newNotices1[action.payload.index],
        height: action.payload.height,
        width: action.payload.width
      };
      newNotices1[action.payload.index] = newNotice1;
      return {
        ...state,
        notices: newNotices1
      };
    case "ADD_NOTICES_WINDOW_DIMS":
      return {
        ...state,
        noticesWindowDims: action.payload,
        sorted: false,
        resize: false,
        update: true,
        waitTillDimUpdate: false,
        loading: true
      };
    case "UPDATE_SORTED_NOTICES":
      return {
        ...state,
        noticesSorted: [...action.payload],
        sorted: true,
        noticesVisible: true,
        updatedUnsorted: false,
        update: false,
        waitTillDimUpdate: true,
        newNoticeArrange: false,
        sortDelete: false,
        loading: false,
        pageNumberChanged: false
      };
    case "RESIZE":
      return {
        ...state,
        resize: true,
        update: true,
        sorted: false,
        waitTillDimUpdate: true,
        pageNumber: 1,
        loading: true
      };
    case "UPDATE_PAGE_NUMBER":
      return {
        ...state,
        pageNumber: action.payload,
        pageNumberChanged: true
      };
    case "UPDATE_UNSORTED_NOTICES":
      return {
        ...state,
        notices: [...action.payload.notices],
        sorted: false,
        updatedUnsorted: true,
        noticesVisible: true,
        update: true,
        newNoticeArrange: false,
        loading: true
      };
    case "LOG_OUT_NOTICES":
      return {
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
        pageNumber: 1
      };
    case "DELETE_NOTICE":
      var newNotices = [...state.noticesSorted];
      for (
        let index = 0;
        index < newNotices[state.pageNumber].length;
        index++
      ) {
        const element = newNotices[state.pageNumber][index];
        if (element.slug === action.payload.slug) {
          newNotices[state.pageNumber].splice(index, 1);
        }
      }
      return {
        ...state,
        noticesSorted: newNotices,
        sortDelete: true,
        loading: true
      };
  }

  return state;
};
