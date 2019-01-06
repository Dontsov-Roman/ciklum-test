import * as React from "react";
import "./style.scss";

const Column: React.FunctionComponent<any> = ({ children }) => (
    <div className="column">
        {children}
    </div>
);
export default Column;