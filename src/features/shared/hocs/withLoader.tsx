import * as React from "react";

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
            return fetching ? <div>loading...</div> : <Component {...props} />;
        }
};
export default withLoading;