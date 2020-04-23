import App from "./components/App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import store from "./store";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Notice from "./components/Notice";
import Profile from "./components/Profile";
import Pinned from "./components/Pinned";
import PrivateRoute from "./components/PrivateRoute";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <Route path="/globalboard" component={Home} />
        <Redirect exact from="/" to="/globalboard" />
        <PrivateRoute path="/@:username/pinned" component={Pinned} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/settings" component={Settings} />
        <Route path="/notice/:id" component={Notice} />
        <PrivateRoute path="/@:username" component={Profile} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
