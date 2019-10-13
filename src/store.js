import { applyMiddleware, createStore, combineReducers } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import auth from "./reducers/auth";
import common from "./reducers/common";
import home from "./reducers/home";
import settings from "./reducers/settings";
import notice from "./reducers/notice";
import notices from "./reducers/notices";
import profile from "./reducers/profile";

const reducer = combineReducers({
  notice,
  notices,
  auth,
  common,
  home,
  profile,
  settings
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;
