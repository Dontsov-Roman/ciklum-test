import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { RouteComponentProps, Link } from "react-router-dom";
import Text from "../../components/Text";
import Column, { Justify } from "../../components/Column";
import Centered from "../../components/Centered";
import Search from "../paragraphs/components/Search";
import { Browsers, Context } from "../../components/Layouts/Browser";

interface IHome extends WithNamespaces, RouteComponentProps {
    style?: {
        [key: string]: any;
    };
}

class Home extends React.Component<IHome> {
    render () {
        const { t, style } = this.props;
        return (
            <Text>
                <Centered>
                    <Column style={style} justify={Justify.Center}>
                        {t("welcome")}
                        <Search />
                        <Link to="/fb/results">{t("suggestions")}</Link>
                    </Column>
                </Centered>
            </Text>
        );
    }
}
class ThemedHome extends React.Component<IHome> {
    static contextType = Context;
    static defaultProps = {
        style: {}
    };
    render() {
        const { style } = this.props;
        let width = 1280;
        if (this.context === Browsers.Mobile) width = 600;
        return <Home {...this.props} style={{ ...style, width }} />;
    }
}

export default withNamespaces()(ThemedHome);