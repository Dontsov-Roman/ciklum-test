import * as React from "react";
import "./style.scss";
export enum Justify {
    Center,
    Start,
    End
}
interface IProps {
    justify?: Justify;
}

const Row: React.FunctionComponent<IProps> = ({ children, justify }) => {
    let className = "row";
    switch(justify) {
        case Justify.Start: {
            className += " start";
            break;
        }
        case Justify.End: {
            className += " end";
            break;
        }
        case Justify.Center:
        default:
        {
            className += " center";
        }
    }
    return (
        <div className={className}>
            {children}
        </div>
    );
};
Row.defaultProps = {
    justify: Justify.Center
};
export default Row;