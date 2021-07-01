import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import store from "./redux/store";

import "./index.scss";
import axios from "axios";
axios.defaults.baseURL = "https://the-original-brand.herokuapp.com/api/v1";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
