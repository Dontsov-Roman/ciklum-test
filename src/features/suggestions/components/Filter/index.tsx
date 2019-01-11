import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input/Simple";
import Row, { Justify } from "../../../../components/Row";
import Column from "../../../../components/Column";
import Paper from "../../../../components/Paper";
import CheckBox from "../../../../components/CheckBox";

import "./style.scss";
import IStore from "../../../../redux/store";

interface IProps {
    showApproved: boolean;
    onChange: Function;
    onApplyFilter: Function;
    onChangeSearchText: (s: string) => void;
    searchText: string;
    per_page: number;
}

class Filter extends React.Component<IProps & WithNamespaces> {
    render() {
        const { t, showApproved, onChange, onApplyFilter, onChangeSearchText, searchText, per_page } = this.props;
        return (
            <Paper withShadow>
                <Column justify={Justify.Center}>
                    <Row style={{ height: 40, width: "100%", marginBottom: 10 }} justify={Justify.SpaceBetween}>
                        <Input defaultValue={searchText} onChange={onChangeSearchText} timeout={500} />
                        <CheckBox
                            style={{ minWidth: 200, marginLeft: 10 }}
                            defaultChecked={showApproved}
                            text={t("showApproved")}
                            onChange={() => onChange(!showApproved)}
                        />
                    </Row>
                    <Button primary onClick={onApplyFilter}>
                        {t("apply")}
                    </Button>
                </Column>
            </Paper>
        );
    }
}

export default connect(
    (state: IStore) => ({
        showApproved: state.suggestions.showApproved,
        searchText: state.suggestions.searchText,
        per_page: state.suggestions.per_page
    }),
    dispatch => ({
        onChange: (showApproved) => dispatch(actions.setShowApproved(showApproved)),
        onApplyFilter: () => dispatch(actions.applyFilter()),
        onChangeSearchText: (searchText: string) => dispatch(actions.changeSearchText(searchText))
    })
)(withNamespaces()(Filter));