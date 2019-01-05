import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppRedux } from "./redux";
import App from "./features/app";
import "./translations";
const rootEl = document.getElementById("app");
render(
    <App />
    ,
    rootEl
);