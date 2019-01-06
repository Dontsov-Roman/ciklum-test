import constants from "./constants";
import Factory, { SimpleThunkAction } from "../../../redux/actions/factory";
import repo, { IParagraph } from "../repo";

export const defaultAction = Factory<IParagraph>(constants, repo);
export default defaultAction;