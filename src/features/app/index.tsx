import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Paragraphs from "../paragraphs";
import Suggestions from "../suggestions";
import Home from "../home";
import BrowserLayout from "../../components/Layouts/Browser";

class App extends React.Component {
    render() {
        return (
            <Router>
                <BrowserLayout>
                    <Route path="/" exact strict component={Home} />
                    <Route exact path="/fb" component={Paragraphs} />
                    <Route exact path="/fb/results" component={Suggestions} />
                </BrowserLayout>
            </Router>
        );
    }
}

export default App;