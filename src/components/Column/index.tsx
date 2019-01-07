import * as React from "react";
import { getClassNameByJustify, Justify } from "../Row";
import "./style.scss";
import "../Row/style.scss";

export { Justify };

interface IProps {
    justify?: Justify;
}

const Column: React.FunctionComponent<IProps> = ({ children, justify }) => {
    const className = `column${getClassNameByJustify(justify)}`;
    return (
        <div className={className}>
            {children}
        </div>
    );
};
Column.defaultProps = {
    justify: Justify.Start
};
export default Column;