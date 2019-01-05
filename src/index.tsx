import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

const rootEl = document.getElementById("app");

render(
    <div>Hello world</div>,
    rootEl
);