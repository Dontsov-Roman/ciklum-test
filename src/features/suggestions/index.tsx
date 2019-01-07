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
import Row, { Justify } from "../../components/Row";
import Paper from "../../components/Paper";
import { IArticle, recursiveToArray } from "./redux/reducer";
import Paragraph from "./components/Paragraph";

interface IStoreProps {
    fetching: boolean;
    data: IArticle[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (item: ISuggestion) => void;
    onApprove: (item: ISuggestion) => void;
    onApproveOwn: (item: ISuggestion) => void;
    onReject: (item: ISuggestion) => void;
}
type IProps = IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Suggestions extends React.Component<IProps> {
    render() {
        const { data, onChangeItem, onApprove, onReject, onApproveOwn } = this.props;
        return (
            <Column centered>
                {data.map((article, key) => (
                    <Column key={article.articleUrl}>
                        <Row justify={Justify.Center}><Text bold>{article.articleUrl}</Text></Row>
                        {article.data.map(paragraph => (
                            <Paper withShadow key={paragraph.paragraphId}>
                                <Paragraph
                                    paragraph={paragraph}
                                    onApprove={onApprove}
                                    onReject={onReject}
                                    onChangeItem={(suggestion) => onChangeItem(suggestion)}
                                    onApproveOwn={onApproveOwn}
                                />
                            </Paper>
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
        onChangeItem: (item) => undefined,
        onApprove: item => dispatch(actions.approveSuggestion(item)),
        onApproveOwn: item => dispatch(actions.approveOwnSuggestion(item)),
        onReject: item => dispatch(actions.rejectSuggestion(item)),
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