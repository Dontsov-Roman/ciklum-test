import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "./redux/actions";
import IStore from "../../redux/store";
import { IParagraph } from "./repo";
import withLoading from "../shared/hocs/withLoader";
import withOnmount from "../shared/hocs/withOnmountRouter";
import Button from "../../components/Button";

interface IStoreProps {
    fetching: boolean;
    data: IParagraph[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
}
type IProps = WithNamespaces & IStoreProps & IStoreDispatchProps & RouteComponentProps;

class Paragraphs extends React.Component<IProps> {
    render() {
        const { t, data } = this.props;
        return (
            <div>
                {t("hello")}
                {data.map(({ article, text }, key) => (
                    <div key={key}>
                        <div>{article}</div>
                        <Button onClick={() => console.warn("send", text, key)}>
                            {t("send")}
                        </Button>
                    </div>
                ))}
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
        onMount: ({ url }) => dispatch(actions.getAll({ url }))
    })
)(
    withNamespaces()(
            withOnmount(
                withLoading(
                        Paragraphs
                    )
            )
        )
    );