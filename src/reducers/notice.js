export default (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'NOTICE_PAGE_LOADED':
      console.log(action.payload[0].notice)
      return {
        ...state,
        notice: action.payload[0].notice,
        comments: action.payload[1].comments
      };
    case 'NOTICE_PAGE_UNLOADED':
      return {};
  }

  return state;
};