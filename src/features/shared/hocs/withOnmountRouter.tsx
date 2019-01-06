import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { parse } from "query-string";

interface IWithOnmountProps {
    onMount?: Function;
}
type P = any;
const WithOnmount = (Component: React.ComponentType<P>) =>
    class WithOnmount extends React.Component<any & IWithOnmountProps & RouteComponentProps> {
        static defaultProps = {
            onMount: () => console.warn("No onmount props"),
        };
        componentWillMount() {
            const { onMount, location: { search } } = this.props;
            onMount(parse(search));
        }
        render() {
            return <Component {...this.props} />;
        }
};
export default WithOnmount;