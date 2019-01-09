import constants from "./constants";
import Factory, { FactoryByIndex } from "../../../redux/actions/factory";
import repo, { IParagraph } from "../repo";

const defaultAction = Factory<IParagraph>(constants, repo);
const byIndexActions = FactoryByIndex<IParagraph>(constants, repo);
export default {
    ...defaultAction,
    ...byIndexActions,
    changeUrl: (payload: string) => ({ type: constants.changeUrl, payload })
};