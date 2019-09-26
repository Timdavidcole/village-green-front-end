import { applyMiddleware, createStore } from "redux";
import { promiseMiddleware } from "./middleware";

const defaultState = {
  appName: "Village Green",
  notices: null
};
const reducer = function(state = defaultState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return { ...state, notices: action.payload.notices };
  }
  return state;
};

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;
