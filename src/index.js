import App from "./components/App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import store from "./store";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Settings from './components/Settings';
import Notice from './components/Notice';
import Profile from './components/Profile';
import Pinned from './components/Pinned';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/@:username/pinned" component={Pinned} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings} />
        <Route path="/notice/:id" component={Notice} />
        <Route path="/@:username" component={Profile} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
