import * as React from "react";
import { debounce } from "lodash";
import IProps from "./IProps";

import "./style.scss";

export default class extends React.Component<IProps> {
    static defaultProps = {
        defaultValue: ""
    };
    onChange = debounce(this.props.onChange, this.props.timeout);
    render() {
        const { defaultValue, style } = this.props;
        return (
            <input
                style={style}
                className="my-input"
                onChange={(e) => this.onChange(e.target.value)}
                defaultValue={defaultValue}
            />
        );
    }
}