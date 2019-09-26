import App from "./components/App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
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
const store = createStore(reducer, applyMiddleware(promiseMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
