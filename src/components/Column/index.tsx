import * as React from "react";
import "./style.scss";

interface IProps {
    centered?: boolean;
}

const Column: React.FunctionComponent<IProps> = ({ children, centered }) => {
    let className = "column";
    if (centered) className += " centered";
    return (
        <div className={className}>
            {children}
        </div>
    );
};
export default Column;