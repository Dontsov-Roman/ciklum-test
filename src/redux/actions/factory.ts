import { ThunkAction } from "redux-thunk";
import IConstants, { IConstantsCreate } from "../constants";
import IRepository, { IParams } from "../../repository/IRepository";
import IStore from "../store";

export type SimpleThunkAction = ThunkAction<void, IStore, any, any>;

export interface IFactoryAction<RepoItem> {
    getAll: (params?: IParams) => SimpleThunkAction;
    getById: (id: string | number) => SimpleThunkAction;
    removeByIdIndex: (id: string | number, index: number) => SimpleThunkAction;
    updateByIndex: (index: number, item: RepoItem) => SimpleThunkAction;
}
export interface IFactoryActionCreate<RepoItem> {
    create: (item: RepoItem) => SimpleThunkAction;
}
export const FactoryWithCreate =
    <RepoItem>(constants: IConstantsCreate, repository: IRepository<RepoItem>)
        : IFactoryActionCreate<RepoItem> => ({
            create: (item) => async (dispatch, getState) => {
                dispatch({ type: constants.createItemRequest });
                try {
                    const payload = await repository.create(item);
                    if(payload) {
                        dispatch({
                            type: constants.createItemSuccess,
                            payload
                        });
                    }
                }
                catch(e) {
                    console.warn(e);
                    dispatch({ type: constants.createItemFail });
                }
            }
        });


export default <RepoItem>(constants: IConstants, repository: IRepository<RepoItem>): IFactoryAction<RepoItem> => {
    const action: IFactoryAction<RepoItem> = {
        getAll: (params) => async (dispatch, getState) => {
            dispatch({
                type: constants.getAllRequest
            });
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
        },
        getById: id => async (dispatch, getState) => {
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
        },
        removeByIdIndex: (id, payload) => async (dispatch, getState) => {
            try {
                const success = await repository.remove(id);
                if (success)
                dispatch({
                    type: constants.removeByIndex,
                    payload
                });
            }
            catch (e) {
                console.warn(e);
            }
        },
        updateByIndex: (index, item) => async (dispatch, getState) => {
            dispatch({
                type: constants.updateByIndex,
                payload: { item, index }
            });
        }
    };
    return action;
};