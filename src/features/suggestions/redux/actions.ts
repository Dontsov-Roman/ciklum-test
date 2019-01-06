import constants from "./constants";
import Factory, { FactoryWithCreate } from "../../../redux/actions/factory";
import repo, { ISuggestion } from "../repo";

export const defaultAction = Factory<ISuggestion>(constants, repo);
export const createActions = FactoryWithCreate<ISuggestion>(constants, repo);
export default {
    ...defaultAction,
    ...createActions
};