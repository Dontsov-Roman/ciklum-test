import * as React from "react";
import Centered from "../Centered";
import "./style.scss";

interface IProps {
    onClick: Function;
    primary?: boolean;
    secondary?: boolean;
}

export default class extends React.Component<IProps> {
    static defaultProps = {
        primary: false,
        secondary: false
    };
    render() {
        const { children, onClick, primary, secondary } = this.props;
        let className = "my-btn";
        if (primary) className += " primary";
        else if (secondary) className += " secondary";
        return (
            <div className={className} onClick={(e) => onClick(e)}>
                <Centered>{children}</Centered>
            </div>
        );
    }
}