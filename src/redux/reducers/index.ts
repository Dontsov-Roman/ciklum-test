import { combineReducers } from "redux/lib/redux";
import IStore from "../store";
import paragraphs from "../../features/paragraphs/redux/reducer";

export default combineReducers<IStore>({
    paragraphs
});