import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "./redux/actions";
import IStore from "../../redux/store";
import { ISuggestion } from "./repo";
import withLoading from "../shared/hocs/withLoader";
import withOnmount from "../shared/hocs/withOnmount";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Text from "../../components/Text";

interface IStoreProps {
    fetching: boolean;
    data: ISuggestion[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (index: number, item: ISuggestion) => void;
    onSend: (item: ISuggestion, index: number) => void;
}
type IProps = WithNamespaces & IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Suggestions extends React.Component<IProps> {
    render() {
        const { t, data, onChangeItem, onSend } = this.props;
        return (
            <div>
                {data.map((suggestion, key) => (
                    <div key={`${suggestion.originalText}-${key}`}>
                        <Text>{suggestion.originalText}</Text>
                        <Input
                            onChange={val => onChangeItem(key, { ...suggestion, usersText: val })}
                            timeout={500}
                            defaultValue={suggestion.usersText}
                        />
                        <Button
                            primary
                            disabled={!suggestion.usersText || suggestion.usersText.length < 1}
                            onClick={() => onSend( { ...suggestion, paragraphId: suggestion.paragraphId }, key )}
                        >
                            {t("send")}
                        </Button>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state: IStore): IStoreProps => {
        console.warn(state);
        return {
            fetching: false,
            data: []
        };
        // return {
        //     fetching: state.suggestions.fetching,
        //     data: state.suggestions.data.toArray()
        // };
    },
    (dispatch): IStoreDispatchProps => ({
        onMount: () => {
            console.warn("SUggestions");
            dispatch(actions.getAll());
        },
        onChangeItem: (index, item) => dispatch(actions.updateByIndex(index, item)),
        onSend: (item, index) => {
            dispatch(actions.removeByIndex(index));
        }
    })
)(
    withNamespaces()(
            withOnmount(
                withLoading(
                        Suggestions
                    )
            )
        )
    );