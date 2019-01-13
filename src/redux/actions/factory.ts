import { ThunkAction, Action } from "redux-thunk";
import IConstants, { IConstantsCreate, IConstantsByIndex, IConstantsLazyLoad } from "../constants";
import IRepository, { IParams, IParamsLazyLoad } from "../../repository/IRepository";
import IStore from "../store";

export type SimpleThunkAction = ThunkAction<void, IStore, any, any>;

export interface IFactoryAction<RepoItem> {
    getAllWithoutLoader: (params?: IParams) => SimpleThunkAction;
    getAll: (params?: IParams) => SimpleThunkAction;
    getById: (id: string | number) => SimpleThunkAction;
    resetStorage: () => Action;
}
export interface IFactoryByIndex<RepoItem> {
    removeByIdIndex: (id: string | number, index: number) => SimpleThunkAction;
    removeByIndex: (index: number) => SimpleThunkAction;
    updateByIndex: (index: number, item: RepoItem) => SimpleThunkAction;
    updateAndSendToServer: (index: number, item: RepoItem) => SimpleThunkAction;
}
export interface IFactoryLazyLoad <RepoItem> {
    getMore: (params?: IParamsLazyLoad) => SimpleThunkAction;
    setPage: (page: number) => Action;
}
export interface IFactoryActionCreate<RepoItem> {
    create: (item: RepoItem) => SimpleThunkAction;
}
export const FactoryWithCreate =
    <RepoItem>(constants: IConstantsCreate, repository: IRepository<RepoItem>)
        : IFactoryActionCreate<RepoItem> => ({
            create: (item) => async (dispatch, getState) => {
                dispatch({ type: constants.createItemRequest });
                console.warn(item);
                try {
                    const payload = await repository.create(item);
                    if(payload) {
                        dispatch({
                            type: constants.createItemSuccess,
                            payload
                        });
                    }
                    console.warn(payload);
                }
                catch(e) {
                    console.warn(e);
                    dispatch({ type: constants.createItemFail });
                }
            }
        });
export const FactoryByIndex =
    <RepoItem>(constants: IConstantsByIndex, repository: IRepository<RepoItem>)
        : IFactoryByIndex<RepoItem> => {
            const removeByIndex = (payload: number) => async (dispatch) => {
                dispatch({
                    type: constants.removeByIndex,
                    payload
                });
            };
            const removeByIdIndex = (id: string | number, payload: number) => async (dispatch, getState) => {
                try {
                    const success = await repository.remove(id);
                    if (success)
                        dispatch(removeByIndex(payload));
                }
                catch (e) {
                    console.warn(e);
                }
            };
            const updateByIndex = (index: number, item: RepoItem) => async (dispatch, getState) => {
                dispatch({
                    type: constants.updateByIndex,
                    payload: { item, index }
                });
            };
            const updateAndSendToServer = (index: number, item: RepoItem) => async (dispatch, getState) => {
                const success = await repository.update(item);
                if (success) {
                    dispatch(updateByIndex(index, item));
                }
            };
            return {
                removeByIndex,
                removeByIdIndex,
                updateByIndex,
                updateAndSendToServer
            };
    };
export const FactoryLazyLoad =
    <RepoItem>(constants: IConstantsLazyLoad, repository: IRepository<RepoItem>)
: IFactoryLazyLoad<RepoItem> => ({
    getMore: (params) => async (dispatch, getState) => {
        dispatch({ type: constants.lazyLoadRequest });
        try {
            const data = await repository.getAll(params);
            if (!data || !data.length) {
                throw new Error("No data");
            }
            dispatch({
                type: constants.lazyLoadSuccess,
                payload: { page: params.page + 1, data }
            });
        }
        catch(e) {
            console.warn(e);
            dispatch({ type: constants.lazyLoadFail });
        }
    },
    setPage: payload => ({ type: constants.lazyLoadSetPage, payload }),
});
export default <RepoItem>(constants: IConstants, repository: IRepository<RepoItem>): IFactoryAction<RepoItem> => {
    const getAllWithoutLoader = (params?: IParams) => async(dispatch, getState) => {
        try {
            const payload = await repository.getAll(params);
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
    const resetStorage = () => ({ type: constants.resetStorage });
    const getAll = (params?: IParams) => async (dispatch, getState) => {
        dispatch({
            type: constants.getAllRequest
        });
        dispatch(getAllWithoutLoader(params));
    };
    const getById = (id: string | number) => async (dispatch, getState) => {
        dispatch({
            type: constants.getByIdRequest
        });
        try {
            const payload = await repository.getOne(id);
            dispatch({
                type: constants.getByIdSuccess,
                payload
            });
        }
        catch(e) {
            dispatch({
                type: constants.getByIdFail
            });
        }
    };

    return {
        getAllWithoutLoader,
        getAll,
        getById,
        resetStorage
    };
};