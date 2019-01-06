import * as React from "react";
import Loader from "../../../components/Loader";
import Centered from "../../../components/Centered";

interface IWithLoadingProps {
    fetching?: boolean;
}
type P = any;
const withLoading = (Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<any & IWithLoadingProps> {
        static defaultProps = {
            fetching: false,
        };
        render() {
            const { fetching, ...props } = this.props;
            return fetching ? <Centered><Loader size={150} /></Centered> : <Component {...props} />;
        }
};
export default withLoading;