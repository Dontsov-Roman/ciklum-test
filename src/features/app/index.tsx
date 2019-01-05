import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Paragraphs from "../paragraphs";

class App extends React.Component {
    render() {
        return (
            <Router
                basename="/fb"
            >
                <div>
                    <Route exact path="/" component={Paragraphs} />
                    <Route path="/results" render={() => <div>results</div>} />
                </div>
            </Router>
        );
    }
}

export default App;