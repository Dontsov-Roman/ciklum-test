import constants from "./constants";
import Factory, { FactoryWithCreate, SimpleThunkAction, IFactoryAction, IFactoryActionCreate } from "../../../redux/actions/factory";
import repo, { ISuggestion } from "../repo";

export const defaultAction = Factory<ISuggestion>(constants, repo);
export const createActions = FactoryWithCreate<ISuggestion>(constants, repo);

const actions: IFactoryAction<ISuggestion> & IFactoryActionCreate<ISuggestion> = {
    ...defaultAction,
    ...createActions
};
export default actions;