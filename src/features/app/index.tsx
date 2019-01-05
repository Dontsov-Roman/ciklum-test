import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import IStore from "../../redux/store";
import Paragraphs from "../paragraphs";

interface IStoreProps {}
type IProps = WithNamespaces & IStoreProps;

class App extends React.Component<IProps> {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Paragraphs />
            </div>
        );
    }
}

export default connect(
    (state: IStore): IStoreProps => ({})
)(withNamespaces()(App));