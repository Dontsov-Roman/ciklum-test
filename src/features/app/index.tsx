import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";

interface IProps extends WithNamespaces {
}

class App extends React.Component<IProps> {
    render() {
        const { t } = this.props;
        return (
            <div>
                {t("hello")}
            </div>
        );
    }
}

export default withNamespaces()(App);