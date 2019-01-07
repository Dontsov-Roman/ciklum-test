import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "./redux/actions";
import IStore from "../../redux/store";
import { ISuggestion } from "./repo";
import withLoading from "../shared/hocs/withLoader";
import withOnmount from "../shared/hocs/withOnmount";
import withEmptyScreen from "../shared/hocs/withEmptyScreen";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Row from "../../components/Row";

interface IStoreProps {
    fetching: boolean;
    data: ISuggestion[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (index: number, item: ISuggestion) => void;
    onApprove: (item: ISuggestion, index: number) => void;
    onReject: (item: ISuggestion, index: number) => void;
}
type IProps = WithNamespaces & IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Suggestions extends React.Component<IProps> {
    render() {
        const { t, data, onChangeItem, onApprove, onReject } = this.props;
        return (
            <div>
                {data.map((suggestion, key) => (
                    <div key={`${suggestion.id}-${suggestion.paragraphId}`}>
                        <Text>{suggestion.originalText}</Text>
                        <Input
                            onChange={usersText => onChangeItem(key, { ...suggestion, usersText })}
                            timeout={500}
                            defaultValue={suggestion.usersText}
                        />
                        <Row>
                            <Button
                                primary
                                disabled={suggestion.isApproved}
                                onClick={() => onApprove( { ...suggestion, paragraphId: suggestion.paragraphId }, key )}
                            >
                                {t("approve")}
                            </Button>
                            <Button
                                secondary
                                disabled={suggestion.isApproved}
                                onClick={() => onReject(suggestion, key)}
                            >
                                {t("reject")}
                            </Button>
                        </Row>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state: IStore): IStoreProps => ({
        fetching: state.suggestions.fetching,
        data: state.suggestions.data.toArray()
    }),
    (dispatch): IStoreDispatchProps => ({
        onMount: () => {
            dispatch(actions.getAll());
        },
        onChangeItem: (index, item) => dispatch(actions.updateByIndex(index, item)),
        onApprove: (item, index) => {
            dispatch(actions.updateAndSendToServer(index, { ...item, isApproved: true }));
        },
        onReject: (item, index) => {
            dispatch(actions.removeByIdIndex(item.id, index));
        }
    })
)(
    withNamespaces()(
            withOnmount(
                withLoading(
                    withEmptyScreen("noSuggestions")(
                            Suggestions
                        )
                    )
            )
        )
    );