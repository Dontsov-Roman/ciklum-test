import * as React from "react";

interface IProps {
    onClick: Function;
}

export default class extends React.Component<IProps> {
    render() {
        const { children, onClick } = this.props;
        return (
            <div onClick={(e) => onClick(e)}>
                {children}
            </div>
        );
    }
}