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
import IStore from "../../../redux/store";

export const defaultAction = Factory<ISuggestion>(constants, repo);
export const createActions = FactoryWithCreate<ISuggestion>(constants, repo);
interface ISuggestionActions {
    rejectSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveOwnSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    getAllWithoutLoader: (params?: IParams) => SimpleThunkAction;
    toggleShowApproved: () => Action;
}
const getAllWithoutLoader = (params?: IParams) => async(dispatch, getState) => {
    try {
        const { suggestions: { showApproved } }: IStore = getState();
        const payload = await repo.getAll({ ...params, showApproved });
        dispatch({
            type: constants.getAllSuccess,
            payload
        });
    }
    catch(e) {
        dispatch({
            type: constants.getAllFail
        });
    }
};
const actions: IFactoryAction<ISuggestion> & IFactoryActionCreate<ISuggestion> & ISuggestionActions = {
    ...defaultAction,
    ...createActions,
    getAll: (params?: IParams) => async(dispatch, getState) => {
        dispatch({
            type: constants.getAllRequest
        });
        dispatch(getAllWithoutLoader(params));
    },
    rejectSuggestion: suggestion => async (dispatch, getState) => {
        await repo.remove(suggestion.id);
        dispatch(getAllWithoutLoader());
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
    getAllWithoutLoader
};
export default actions;