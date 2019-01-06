import { combineReducers } from "redux/lib/redux";
import IStore from "../store";
import paragraphs from "../../features/paragraphs/redux/reducer";
import suggestions from "../../features/suggestions/redux/reducer";

export default combineReducers<IStore>({
    paragraphs,
    suggestions
});