import * as React from "react";

import "./style.scss";
interface IProps {
    withShadow?: boolean;
}
const Paper: React.FunctionComponent<IProps> = ({ children, withShadow }) => {
    let className = "paper";
    if (withShadow) className += " shadow";
    return (
        <div className={className}>
            {children}
        </div>
    );
};
Paper.defaultProps = {
    withShadow: false
};
export default Paper;