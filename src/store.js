import { applyMiddleware, createStore, combineReducers } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import auth from "./reducers/auth";
import common from "./reducers/common";
import home from "./reducers/home";
import settings from "./reducers/settings";
import notice from "./reducers/notice";
import notices from "./reducers/notices";
import profile from "./reducers/profile";
import pinned from "./reducers/pinned";
import map from "./reducers/map";
import createLogger from 'redux-logger';

const reducer = combineReducers({
  notice,
  notices,
  auth,
  common,
  home,
  profile,
  map,
  settings,
  pinned
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;
