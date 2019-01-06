import * as React from "react";
import Centered from "../Centered";
import { Browsers, Context } from "../Layouts/Browser";
import "./style.scss";

interface IProps {
    onClick: Function;
    disabled?: boolean;
    primary?: boolean;
    secondary?: boolean;
}

export class Button extends React.Component<IProps> {
    static defaultProps = {
        primary: false,
        secondary: false,
        disabled: false
    };
    render() {
        const { disabled, children, onClick, primary, secondary } = this.props;
        let className = "my-btn";
        if (disabled) className += " disabled";
        else if (primary) className += " primary";
        else if (secondary) className += " secondary";
        return (
            <div className={className} onClick={e => { if (!disabled) onClick(e); }}>
                <Centered>{children}</Centered>
            </div>
        );
    }
}
export default class ThemedButton extends React.Component<IProps, {}, Browsers> {
    static contextType = Context;
    render() {
        let { secondary } = this.props;
        if (this.context === Browsers.Mobile) secondary = false;
        return <Button {...this.props} secondary={secondary} />;
    }
}