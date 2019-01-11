import * as React from "react";
import { getClassNameByJustify, Justify } from "../Row";
import "./style.scss";
import "../Row/style.scss";

export { Justify };

interface IProps {
    justify?: Justify;
    style?: {};
}

const Column: React.FunctionComponent<IProps> = ({ children, justify, style }) => {
    const className = `column${getClassNameByJustify(justify)}`;
    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
};
Column.defaultProps = {
    justify: Justify.Start
};
export default Column;