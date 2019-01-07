import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "./redux/actions";
import IStore from "../../redux/store";
import { ISuggestion } from "./repo";
import withLoading from "../shared/hocs/withLoader";
import withOnmount from "../shared/hocs/withOnmount";
import withEmptyScreen from "../shared/hocs/withEmptyScreen";
import Text from "../../components/Text";
import Column from "../../components/Column";
import { IArticle, recursiveToArray } from "./redux/reducer";
import Paragraph from "./components/Paragraph";

interface IStoreProps {
    fetching: boolean;
    data: IArticle[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (index: number, item: ISuggestion) => void;
    onApprove: (item: ISuggestion, index: number) => void;
    onApproveOwn: (item: ISuggestion) => void;
    onReject: (item: ISuggestion, index: number) => void;
}
type IProps = IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Suggestions extends React.Component<IProps> {
    render() {
        const { data, onChangeItem, onApprove, onReject, onApproveOwn } = this.props;
        console.warn(data[0].data);
        return (
            <Column centered>
                {data.map((article, key) => (
                    <Column key={article.articleUrl}>
                        <Text bold>{article.articleUrl}</Text>
                        {article.data.map(paragraph => (
                            <Paragraph
                                key={paragraph.paragraphId}
                                paragraph={paragraph}
                                onApprove={(suggestion) => onApprove(suggestion, key)}
                                onReject={(suggestion) => onReject(suggestion, key)}
                                onChangeItem={(suggestion) => onChangeItem(key, suggestion)}
                                onApproveOwn={onApproveOwn}
                            />
                        ))}
                    </Column>
                ))}
            </Column>
        );
    }
}

export default connect(
    (state: IStore): IStoreProps => {
        return {
            fetching: state.suggestions.fetching,
            data: recursiveToArray(state.suggestions.data)
        };
    },
    (dispatch): IStoreDispatchProps => ({
        onMount: () => {
            dispatch(actions.getAll());
        },
        onChangeItem: (index, item) => dispatch(actions.updateByIndex(index, item)),
        onApprove: (item, index) => {
            dispatch(actions.updateAndSendToServer(index, { ...item, isApproved: true }));
            dispatch(actions.removeByIndex(index));
        },
        onApproveOwn: item => {
            console.warn(item);
        },
        onReject: (item, index) => {
            dispatch(actions.removeByIdIndex(item.id, index));
        }
    })
)(
    withOnmount(
        withLoading(
            withEmptyScreen("noSuggestions")(
                    Suggestions
                )
            )
    )
);