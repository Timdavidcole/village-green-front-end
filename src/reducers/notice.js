export default (
  state = {
    showNewNoticeWindow: false,
    newNoticeMenuItem: "new-notice-menu-poster",
    editNotice: false,
    childNotices: []
  },
  action
) => {
  switch (action.type) {
    case "NOTICE_PAGE_LOADED":
      return {
        ...state,
        notice: action.payload[0].notice,
        childNotices: action.payload[1].noticeChildren
      };
    case "EDIT_NOTICE":
      return {
        ...state,
        notice: action.payload.notice,
        editNotice: false
      };
    case "ADD_CHILD_NOTICE":
      return {
        ...state,
        childNotices: [action.payload, ...state.childNotices]
      };

    case "NOTICE_PAGE_UNLOADED":
      return { newNoticeMenuItem: "new-notice-menu-poster" };
    case "ADD_COMMENT":
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error
          ? null
          : (state.comments || []).concat([action.payload.comment])
      };
    case "DELETE_COMMENT":
      const commentId = action.commentId;
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
    case "DISPLAY_NEW_NOTICE":
      return {
        ...state,
        showNewNoticeWindow: !state.showNewNoticeWindow
      };
    case "HIDE_NEW_NOTICE":
      return {
        ...state,
        showNewNoticeWindow: false
      };
    case "NEW_NOTICE_MENU_ITEM_SELECTED":
      return {
        ...state,
        newNoticeMenuItem: action.payload
      };
    case "EDIT_NOTICE_TOGGLE":
      return {
        ...state,
        editNotice: !state.editNotice
      };
  }

  return state;
};
