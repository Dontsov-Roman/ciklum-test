import * as React from "react";
import "./style.scss";

interface IProps {
    color?: string;
    size?: number;
}

const Loader: React.FunctionComponent<IProps> = ({ color, size }) => {
    const widthHeight = { width: size, height: size };
    const mainSize = { width: size ? size + 13 : undefined, height: size ? size + 13 : undefined };
    return (
        <div className="lds-ring" style={mainSize}>
            <div
                style={{
                    border: `6px solid ${color}`,
                    borderColor: `${color}  transparent transparent transparent`,
                    ...widthHeight
                }}
                ></div>
                <div style={widthHeight}></div>
                <div style={widthHeight}></div>
                <div style={widthHeight}></div>
            </div>
    );
};

export default Loader;