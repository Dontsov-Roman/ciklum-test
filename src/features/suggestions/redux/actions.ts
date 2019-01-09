import { Action } from "redux/lib/redux";
import constants from "./constants";
import Factory, {
    FactoryWithCreate,
    SimpleThunkAction,
    IFactoryAction,
    IFactoryActionCreate
} from "../../../redux/actions/factory";
import repo, { ISuggestion } from "../repo";
import { IParams } from "../../../repository/IRepository";

export const defaultAction = Factory<ISuggestion>(constants, repo);
export const createActions = FactoryWithCreate<ISuggestion>(constants, repo);

interface ISuggestionActions extends IFactoryAction<ISuggestion>, IFactoryActionCreate<ISuggestion> {
    rejectSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveOwnSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    getAllWithoutLoader: (params?: IParams) => SimpleThunkAction;
    toggleShowApproved: () => Action;
    changeSearchText: (searchText: string) => Action;
}

const changeSearchText = (payload: string) => ({ type: constants.changeSearchText, payload });
const actions: ISuggestionActions = {
    ...defaultAction,
    ...createActions,
    rejectSuggestion: suggestion => async (dispatch, getState) => {
        await repo.remove(suggestion.id);
        dispatch(defaultAction.getAllWithoutLoader());
    },
    approveSuggestion: suggestion => async (dispatch, getState) => {
        dispatch({ type: constants.removeParagraph, payload: suggestion });
        repo.update({ ...suggestion, isApproved: true });
    },
    approveOwnSuggestion: suggestion => async (dispatch, getState) => {
        dispatch({ type: constants.removeParagraph, payload: suggestion });
        await repo.removeByParagraphId(suggestion.paragraphId);
        const { _id: id } = await repo.create(suggestion);
        repo.update({ ...suggestion, isApproved: true, id });
    },
    toggleShowApproved: () => ({ type: constants.showApprovedToggle }),
    changeSearchText
};
export default actions;