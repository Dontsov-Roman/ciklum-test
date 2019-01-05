import { ISimpleState } from "./reducers/factory";
import { IParagraph } from "../features/paragraphs/repo";

export default interface IStore {
    paragraphs: ISimpleState<IParagraph>;
}