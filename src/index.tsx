import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppRedux } from "./redux";
import App from "./features/app";
import "./translations";
const rootEl = document.getElementById("app");
const appRedux = new AppRedux();

render(
    <Provider store={appRedux.store}>
        <App />
    </Provider>
    ,
    rootEl
);