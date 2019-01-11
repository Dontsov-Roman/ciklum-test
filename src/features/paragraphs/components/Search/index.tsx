import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Dispatch } from "redux/lib/redux";
import Input from "../../../../components/Input/Simple";
import Button from "../../../../components/Button";
import Row from "../../../../components/Row";
import { WithNamespaces, withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import IStore from "../../../../redux/store";
import actions from "../../redux/actions";

interface IProps extends WithNamespaces, RouteComponentProps {
    url: string;
    onChangeUrl: (url: string) => void;
}
class Search extends React.Component<IProps> {
    render() {
        const { url, t, onChangeUrl, history } = this.props;
        return (
            <Row style={{ width: "100%" }}>
                <Input timeout={100} defaultValue={url} onChange={onChangeUrl} />
                <Button primary onClick={() => history.push(`/fb?url=${url}`)}>
                    {t("search")}
                </Button>
            </Row>
        );
    }
}
export default connect(
    (state: IStore) => ({
        url: state.paragraphs.url
    }),
    (dispatch: Dispatch) => ({
        onChangeUrl: url => dispatch(actions.changeUrl(url))
    })
)(withNamespaces()(withRouter(Search)));