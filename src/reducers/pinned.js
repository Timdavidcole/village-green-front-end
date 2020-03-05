export default (state = {}, action) => {
  console.log(action.payload);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "PINNED_PAGE_LOADED":
      return {
        ...state,
        notices: action.payload[1].notices,
        noticesCount: action.payload[1].noticesCount
      };
    case "PINNED_FAVORITES_PAGE_UNLOADED":
      return {};
    case "UPDATE_PINNED":
      return {
        ...state,
        notices: action.payload
      };
  }

  return state;
};
