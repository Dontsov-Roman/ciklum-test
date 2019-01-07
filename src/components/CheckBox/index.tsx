import * as React from "react";
import Text from "../Text";
import "./style.scss";

interface IProps {
    defaultChecked?: boolean;
    onChange: Function;
    text: string;
    style?: {};
}

class CheckBox extends React.Component<IProps> {
    static defaultProps = {
        defaultChecked: false
    };
    render() {
        const { defaultChecked, onChange, text, style } = this.props;
        return (
            <label style={style} className="container">
                <Text>{text}</Text>
                <input type="checkbox" onChange={e => onChange(e)} checked={defaultChecked} />
                <span className="checkmark"></span>
            </label>
        );
    }
}
export default CheckBox;