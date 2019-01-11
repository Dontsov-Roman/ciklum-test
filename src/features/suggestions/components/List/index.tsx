import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import actions from "../../redux/actions";
import IStore from "../../../../redux/store";
import { ISuggestion } from "../../repo";
import withLoading from "../../../shared/hocs/withLoader";
import withEmptyScreen from "../../../shared/hocs/withEmptyScreen";
import Text from "../../../../components/Text";
import Column from "../../../../components/Column";
import Row, { Justify } from "../../../../components/Row";
import Paper from "../../../../components/Paper";
import { IArticle } from "../../redux/reducer";
import Paragraph from "./../Paragraph";
import { recursiveToArray, ILazyLoadState } from "../../../../redux/reducers/factory";
import { IParamsLazyLoad } from "../../../../repository/IRepository";
import withLazyLoad from "../../../shared/hocs/withLazyLoad";

interface IStoreProps extends ILazyLoadState {
    fetching: boolean;
    data: IArticle[];
}
interface IStoreDispatchProps {
    onMount: (params: { url: string }) => void;
    onChangeItem: (item: ISuggestion) => void;
    onApprove: (item: ISuggestion) => void;
    onApproveOwn: (item: ISuggestion) => void;
    onReject: (item: ISuggestion) => void;
    getMore: (params: IParamsLazyLoad) => void;
}
type IProps = IStoreProps & IStoreDispatchProps & RouteComponentProps;

export class Suggestions extends React.Component<IProps> {
    render() {
        const { data, onChangeItem, onApprove, onReject, onApproveOwn } = this.props;
        return (
            <Column justify={Justify.Center}>
                {data.map((article, key) => (
                    <Column justify={Justify.Center} key={article.articleUrl}>
                        <Row><Text bold>{article.articleUrl}</Text></Row>
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
            data: recursiveToArray(state.suggestions.data),
            per_page: state.suggestions.per_page,
            page: state.suggestions.page,
            fetchingLazyLoad: state.suggestions.fetchingLazyLoad
        };
    },
    (dispatch): IStoreDispatchProps => ({
        onMount: () => {
            dispatch(actions.getMore());
        },
        onChangeItem: (item) => undefined,
        onApprove: item => dispatch(actions.approveSuggestion(item)),
        onApproveOwn: item => dispatch(actions.approveOwnSuggestion(item)),
        onReject: item => dispatch(actions.rejectSuggestion(item)),
        getMore: (params: IParamsLazyLoad) => dispatch(actions.getMore(params))
    })
)(
    withLoading(
        withEmptyScreen("noSuggestions")(
            withLazyLoad(
                Suggestions
                )
            )
        )
);