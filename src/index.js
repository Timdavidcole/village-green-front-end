import App from "./components/App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import store from "./store";
import { Router, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={App} />
      <Route exact path="/" component={Home} />
      <Route path="login" component={Login} />
    </HashRouter>{" "}
  </Provider>,
  document.getElementById("root")
);
