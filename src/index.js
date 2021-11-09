import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "semantic-ui-css/semantic.min.css";
// import "antd/dist/antd.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import authReducer from "./store/reducers/auth";
import "./mobile.css";
import "./index.css";
import "./App.css";

import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.baseURL = "https://elitemanga-test.herokuapp.com/";
// axios.defaults.baseURL = "http://192.168.43.127:8000/";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
