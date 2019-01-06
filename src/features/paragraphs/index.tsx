import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "./redux/actions";
import suggestionsActions from "../suggestions/redux/actions";
import IStore from "../../redux/store";
import { IParagraph } from "./repo";
import withLoading from "../shared/hocs/withLoader";
import withOnmount from "../shared/hocs/withOnmountRouter";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Text from "../../components/Text";
import { ISuggestion } from "../suggestions/repo";
import BrowserLayout, { Browsers } from "../../components/Layouts/Browser";

interface IStoreProps {
    fetching: boolean;
    data: IParagraph[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (index: number, item: IParagraph) => void;
    onSend: (item: ISuggestion, index: number) => void;
}
type IProps = WithNamespaces & IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Paragraphs extends React.Component<IProps> {
    render() {
        const { t, data, onChangeItem, onSend } = this.props;
        return (
            <BrowserLayout.Provider value={Browsers.Standart}>
                <div>
                    {data.map(({ article, text }, key) => (
                        <div key={key}>
                            <Text>{article}</Text>
                            <Input
                                onChange={(val) => onChangeItem(key, { article, text: val })}
                                timeout={500}
                                defaultValue={text}
                            />
                            <Button
                                primary
                                onClick={() => onSend({ paragraphId: article, text, isApproved: false }, key)}
                            >
                                {t("send")}
                            </Button>
                        </div>
                    ))}
                </div>
            </BrowserLayout.Provider>
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
        onChangeItem: (index, item) => dispatch(actions.updateByIndex(index, item)),
        onSend: (item, index) => {
            dispatch(suggestionsActions.create(item));
            dispatch(actions.removeByIndex(index));
        }
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