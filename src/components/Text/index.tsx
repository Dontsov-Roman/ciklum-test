import * as React from "react";
import { Browsers, Context } from "../Layouts/Browser";
import "./style.scss";
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
export default class ThemedText extends React.Component<IProps, {}, Browsers> {
    static contextType = Context;
    render () {
        let { italic, bold } = this.props;
        if (this.context === Browsers.Mobile) {
            italic = true;
            bold = true;
        }
        return <Text {...this.props} italic={italic} bold={bold} />;
    }
}