import * as React from "react";

interface IWithOnmountProps {
    onMount?: Function;
}
type P = any;
const WithOnmount = (Component: React.ComponentType<P>) =>
    class WithOnmount extends React.Component<any & IWithOnmountProps> {
        static defaultProps = {
            onMount: () => console.warn("No onmount props"),
        };
        componentWillMount() {
            const { onMount } = this.props;
            onMount();
        }
        render() {
            const { onMount, ...props } = this.props;
            return <Component {...props} />;
        }
};
export default WithOnmount;