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
import Input from "../../components/Input";

interface IStoreProps {
    fetching: boolean;
    data: IParagraph[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (index: number, item: IParagraph) => void;
}
type IProps = WithNamespaces & IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Paragraphs extends React.Component<IProps> {
    render() {
        const { t, data, onChangeItem } = this.props;
        return (
            <div>
                {data.map(({ article, text }, key) => (
                    <div key={key}>
                        <div>{article}</div>
                        <Input
                            onChange={(val) => onChangeItem(key, { article, text: val })}
                            timeout={500}
                            defaultValue={text}
                        />
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
        onMount: ({ url }) => dispatch(actions.getAll({ url })),
        onChangeItem: (index, item) => dispatch(actions.updateByIndex(index, item))
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