import * as React from "react";
import Column from "../../components/Column";
import { Justify } from "../../components/Row";
import Filter from "./components/Filter";
import List from "./components/List";

export class Suggestions extends React.Component {
    render() {
        return (
            <Column justify={Justify.Center}>
                <Filter />
                <List />
            </Column>
        );
    }
}
export default Suggestions;