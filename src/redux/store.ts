import { ISimpleState } from "./reducers/factory";
import { IParagraph } from "../features/paragraphs/repo";
import { ISuggestionState } from "../features/suggestions/redux/reducer";

export default interface IStore {
    paragraphs: ISimpleState<IParagraph>;
    suggestions: ISuggestionState;
}