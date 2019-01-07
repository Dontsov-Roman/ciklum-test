import constants from "./constants";
import Factory, {
    FactoryWithCreate,
    SimpleThunkAction,
    IFactoryAction,
    IFactoryActionCreate
} from "../../../redux/actions/factory";
import repo, { ISuggestion } from "../repo";

export const defaultAction = Factory<ISuggestion>(constants, repo);
export const createActions = FactoryWithCreate<ISuggestion>(constants, repo);
interface ISuggestionActions {
    rejectSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveOwnSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
}

const actions: IFactoryAction<ISuggestion> & IFactoryActionCreate<ISuggestion> & ISuggestionActions = {
    ...defaultAction,
    ...createActions,
    rejectSuggestion: suggestion => (dispatch, getState) => {},
    approveSuggestion: suggestion => async (dispatch, getState) => {
        dispatch({ type: constants.removeParagraph, payload: suggestion });
        repo.update({ ...suggestion, isApproved: true });
    },
    approveOwnSuggestion: suggestion => (dispatch, getState) => {},
};
export default actions;