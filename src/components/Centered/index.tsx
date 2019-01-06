import * as React from "react";
import "./style.scss";

const Centered: React.FunctionComponent<any> = ({ children }) => (
    <div className="centered">
        {children}
    </div>
);
export default Centered;