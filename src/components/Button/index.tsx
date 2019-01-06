import * as React from "react";
import Centered from "../Centered";
import BrowserLayout, { Browsers } from "../Layouts/Browser";
import "./style.scss";

interface IProps {
    onClick: Function;
    primary?: boolean;
    secondary?: boolean;
}

export class Button extends React.Component<IProps> {
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
export default class ThemedButton extends React.Component<IProps, {}, Browsers> {
    static contextType = BrowserLayout;
    render() {
        let { secondary } = this.props;
        if (this.context === Browsers.Mobile) secondary = false;
        return <Button {...this.props} secondary={secondary} />;
    }
}