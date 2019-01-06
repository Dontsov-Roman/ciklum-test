import * as React from "react";
import "./style.scss";

interface IProps {
    bold?: boolean;
    italic?: boolean;
}

const Text: React.FunctionComponent<IProps> = (props) => {
    const { children, bold, italic } = props;
    let className = "my-text";
    if (bold) className += " bold";
    if (italic) className += " italic";
    return (
        <div className={className}>
            {children}
        </div>
    );
};
Text.defaultProps = {
    italic: false,
    bold: false
};
export default Text;