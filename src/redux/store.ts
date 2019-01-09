import { ISuggestionState } from "../features/suggestions/redux/reducer";
import { IParagraphsState } from "../features/paragraphs/redux/reducer";

export default interface IStore {
    paragraphs: IParagraphsState;
    suggestions: ISuggestionState;
}