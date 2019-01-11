import { Action } from "redux/lib/redux";
import constants from "./constants";
import Factory, {
    FactoryWithCreate,
    SimpleThunkAction,
    IFactoryAction,
    IFactoryActionCreate,
    FactoryLazyLoad,
    IFactoryLazyLoad
} from "../../../redux/actions/factory";
import repo, { ISuggestion } from "../repo";
import { IParams } from "../../../repository/IRepository";
import IStore from "../../../redux/store";

export const defaultAction = Factory<ISuggestion>(constants, repo);
export const createActions = FactoryWithCreate<ISuggestion>(constants, repo);
export const lazyloadActions = FactoryLazyLoad<ISuggestion>(constants, repo);

interface ISuggestionActions extends IFactoryAction<ISuggestion>,
    IFactoryActionCreate<ISuggestion>,
    IFactoryLazyLoad<ISuggestion> {
    rejectSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    approveOwnSuggestion: (suggestion: ISuggestion) => SimpleThunkAction;
    getAllWithoutLoader: (params?: IParams) => SimpleThunkAction;
    setShowApproved: (showApproved: boolean) => Action;
    changeSearchText: (searchText: string) => Action;
    applyFilter: () => SimpleThunkAction;
}

const changeSearchText = (payload: string) => ({ type: constants.changeSearchText, payload });
const setShowApproved = (payload: boolean) => ({ type: constants.setShowApproved, payload });
const getMore = (params?) => (dispatch, getState) => {
    const { suggestions: { showApproved, page, per_page } } = getState();
    dispatch(lazyloadActions.getMore({ page, per_page, showApproved, ...params }));
};
const actions: ISuggestionActions = {
    ...defaultAction,
    ...createActions,
    ...lazyloadActions,
    getMore,
    setShowApproved,
    changeSearchText,
    applyFilter: () => async (dispatch, getState) => {
        const { suggestions: { showApproved, searchText } } = getState() as IStore;
        dispatch(defaultAction.resetStorage());
        dispatch({ type: constants.getAllRequest });
        dispatch(setShowApproved(showApproved));
        dispatch(changeSearchText(searchText));
        dispatch(getMore({ showApproved, searchText }));
    },
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
    }
};
export default actions;