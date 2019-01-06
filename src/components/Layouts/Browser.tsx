import * as React from "react";
export enum Browsers {
    Standart,
    Mobile,
}
export default React.createContext(Browsers.Standart);