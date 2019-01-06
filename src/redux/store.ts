import { ISimpleState } from "./reducers/factory";
import { IParagraph } from "../features/paragraphs/repo";
import { ISuggestion } from "../features/suggestions/repo";

export default interface IStore {
    paragraphs: ISimpleState<IParagraph>;
    suggestions: ISimpleState<ISuggestion>;
}