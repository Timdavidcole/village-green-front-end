import App from "./components/App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import store from "./store";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
