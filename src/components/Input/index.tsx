import * as React from "react";
import { debounce } from "lodash";
import "./style.scss";

interface IProps {
    onChange: (text: string) => void;
    timeout: number;
    defaultValue: string;
    rows?: number;
    cols?: number;
    wrap?: string;
    style?: any;
}
export default class extends React.Component<IProps> {
    onChange = debounce(this.props.onChange, this.props.timeout);
    render() {
        const { defaultValue, style, rows, cols, wrap } = this.props;
        return (
            <textarea
                style={style}
                rows={rows}
                cols={cols}
                wrap={wrap}
                className="my-textarea"
                onChange={(e) => this.onChange(e.target.value)}
                defaultValue={defaultValue}
            />
        );
    }
}