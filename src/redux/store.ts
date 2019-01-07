import { ISimpleState } from "./reducers/factory";
import { IParagraph } from "../features/paragraphs/repo";
import { IArticle } from "../features/suggestions/redux/reducer";

export default interface IStore {
    paragraphs: ISimpleState<IParagraph>;
    suggestions: ISimpleState<IArticle>;
}