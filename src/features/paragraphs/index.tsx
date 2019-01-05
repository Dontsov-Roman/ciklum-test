import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import actions from "./redux/actions";
import IStore from "../../redux/store";
import { IParagraph } from "./repo";
import withLoading from "../shared/hocs/withLoader";
import withOnmount from "../shared/hocs/withOnmount";

interface IStoreProps {
    fetching: boolean;
    data: IParagraph[];
}
interface IStoreDispatchProps {
    onMount: Function;
}
type IProps = WithNamespaces & IStoreProps & IStoreDispatchProps;

class Paragraphs extends React.Component<IProps> {
    render() {
        const { t, data } = this.props;
        return (
            <div>
                {t("hello")}
                {data.map((val, key) => <div key={key}>{JSON.stringify(val)}</div>)}
            </div>
        );
    }
}

export default connect(
    (state: IStore): IStoreProps => ({
        fetching: state.paragraphs.fetching,
        data: state.paragraphs.data.toArray()
    }),
    (dispatch): IStoreDispatchProps => ({
        onMount: () => dispatch(actions.getAll())
    })
)(withNamespaces()(withOnmount(withLoading(Paragraphs))));