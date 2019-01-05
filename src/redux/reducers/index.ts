import { combineReducers } from "redux/lib/redux";
import { IStore } from "../store";
export default combineReducers<IStore>({
    suggestions: (a: any) => a
});