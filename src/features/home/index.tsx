import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import Text from "../../components/Text";
import Column from "../../components/Column";
import Centered from "../../components/Centered";

class Home extends React.Component<WithNamespaces & RouteComponentProps> {
    render () {
        const { t } = this.props;
        return (
            <Text>
                <Centered>
                    <Column>
                        {t("welcome")}
                        <Link to="/fb">{t("paragraphs")}</Link>
                        <Link to="/fb/results">{t("suggestions")}</Link>
                    </Column>
                </Centered>
            </Text>
        );
    }
}

export default withNamespaces()(Home);