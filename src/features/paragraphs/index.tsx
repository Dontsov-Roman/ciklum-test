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
import withEmptyScreen from "../shared/hocs/withEmptyScreen";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Paper from "../../components/Paper";
import { ISuggestion } from "../suggestions/repo";

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
            <div>
                {data.map((paragraph, key) => (
                    <Paper withShadow key={`${paragraph.originalText}-${key}`}>
                        <Text>{paragraph.originalText}</Text>
                        <Input
                            onChange={usersText => onChangeItem(key, { ...paragraph, usersText })}
                            timeout={500}
                            defaultValue={paragraph.usersText}
                        />
                        <Button
                            primary
                            disabled={!paragraph.usersText || paragraph.usersText.length < 1}
                            onClick={() => onSend( { ...paragraph, paragraphId: paragraph._id }, key )}
                        >
                            {t("send")}
                        </Button>
                    </Paper>
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
                    withEmptyScreen("noParagraphs")(
                            Paragraphs
                        )
                    )
            )
        )
    );