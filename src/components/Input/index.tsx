import * as React from "react";
import { debounce } from "lodash";
// import "./style.css";

interface IProps {
    onChange: (text: string) => void;
    timeout: number;
    defaultValue: string;
}
export default class extends React.Component<IProps> {
    onChange = debounce(this.props.onChange, this.props.timeout);
    render() {
        const { defaultValue } = this.props;
        return (
            <textarea
                className="my-textarea"
                onChange={(e) => this.onChange(e.target.value)}
                defaultValue={defaultValue}
            />
        );
    }
}