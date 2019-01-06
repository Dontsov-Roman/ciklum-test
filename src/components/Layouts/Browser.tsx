import * as React from "react";
import bowser from "bowser/src/bowser";
import "./style.scss";

export enum Browsers {
    Standart,
    Mobile,
}
export const Context = React.createContext(Browsers.Standart);

export default class BrowserLayout extends React.Component<any, { value: Browsers }> {
    constructor(props) {
        super(props);
        this.state = { value: Browsers.Standart };
    }
    componentWillMount() {
        try {
            const browser = bowser.getParser(window.navigator.userAgent);
            if (browser.parsedResult.platform.type !== "desktop") {
                this.setState({ value: Browsers.Mobile });
            }
        } catch(e) {
            console.warn("Identify Browser problems appear: ", e);
        }
    }
    render() {
        const { value } = this.state;
        const layout = value === Browsers.Standart ? "desktop-layout" : "mobile-layout";
        return (
            <Context.Provider value={value}>
                <div className={`layout ${layout}`}>
                    {this.props.children}
                </div>
            </Context.Provider>
        );
    }
}