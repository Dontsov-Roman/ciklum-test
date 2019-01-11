import IConstants, { IConstantsCreate, IConstantsByIndex, IConstantsLazyLoad } from "../constants";
import { Reducer, AnyAction } from "redux/lib/redux";
import { List } from "immutable";

export interface IData<T> {
    data: List<T>;
}
export interface IDataArray<T> {
    data: T[];
}
export interface ISimpleState<Item> extends IData<Item> {
    fetching: boolean;
    fetchingOne: boolean;
    current?: Item;
    lastUpdate?: Date;
    [key: string]: any;
}
export interface ILazyLoadState {
    page: number;
    per_page: number;
    fetchingLazyLoad: boolean;
}
export interface ILazyLoadStateSimple <RepoItem> extends ISimpleState<RepoItem>, ILazyLoadState {}

export const recursiveToArray = (list?: List<IData<any>>) => {
    const arr = [];
    if (list && list.forEach) {
        list.forEach(d => {
            const data = d.data && d.data.toArray ? d.data.toArray() : [];
            data.forEach(d => {
                if (d.data && d.data.size) {
                    d.data = recursiveToArray(d.data);
                }
            });
            arr.push({
                ...d,
                data
            });
        });
    }
    return arr;
};
export const recursiveToList = (arr?: IDataArray<any>[]): List<any> => {
    if (arr && arr.length > 0) {
        return List(arr.map((item) => ({
            ...item,
            data: (item.data && item.data.length) ? recursiveToList(item.data) : List()
        })));
    }
    return List();
};

export const FactoryWithCreate = <Item, State extends ISimpleState<Item>>
    (constants: IConstantsCreate, initState: State): Reducer<State, AnyAction> =>
    (state: State = initState, action: AnyAction): State => {
        switch(action.type) {
            case constants.createItemRequest: {
                return { ...state, fetchingOne: true };
            }
            case constants.createItemFail: {
                return { ...state, fetchingOne: false };
            }
            case constants.createItemSuccess: {
                return { ...state, fetchingOne: false, data: state.data.push(action.payload) };
            }
            default: return state;
        }
    };

export const FactoryByIndex = <Item, State extends ISimpleState<Item>>
    (constants: IConstantsByIndex, initState: State): Reducer<State, AnyAction> =>
    (state: State = initState, action: AnyAction): State => {
        switch(action.type) {
            case constants.updateByIndex: {
                const { index, item } = action.payload;
                return {
                    ...state,
                    data: state.data.update(index, () => item)
                };
            }
            case constants.removeByIndex: {
                return {
                    ...state,
                    data: state.data.delete(action.payload)
                };
            }
            default: return state;
        }
    };

export const FactoryWithLazyLoad = <Item, State extends ILazyLoadStateSimple<Item>>
    (constants: IConstantsLazyLoad, initState: State): Reducer<State, AnyAction> =>
    (state: State = initState, action: AnyAction): State => {
        switch(action.type) {
            case constants.lazyLoadRequest: {
                return { ...state, fetchingLazyLoad: true };
            }
            case constants.lazyLoadSuccess: {
                return {
                    ...state,
                    data: state.data.concat(action.payload.data),
                    fetchingLazyLoad: false,
                    page: action.payload.page
                };
            }
            case constants.lazyLoadFail: {
                return { ...state, fetchingLazyLoad: false };
            }
            case constants.lazyLoadSetPage: {
                return { ...state, page: action.payload };
            }
            default: return state;
        }
    };
export default <Item, State extends ISimpleState<Item>>
    (constants: IConstants, initState: State): Reducer<State, AnyAction> =>
    (state: State = initState, action: AnyAction): State => {
        switch (action.type) {
            case constants.getAllRequest: {
                return {
                    ...state,
                    fetching: true
                };
            }
            case constants.getAllSuccess: {
                return {
                    ...state,
                    fetching: false,
                    data: List<Item>(action.payload),
                    lastUpdate: new Date()
                };
            }
            case constants.getAllFail: {
                return {
                    ...state,
                    fetching: false,
                    data: List<Item>()
                };
            }
            case constants.getByIdRequest: {
                return {
                    ...state,
                    fetchingOne: true
                };
            }
            case constants.getByIdSuccess: {
                return {
                    ...state,
                    fetchingOne: false,
                    current: action.payload as Item
                };
            }
            case constants.getByIdFail: {
                return {
                    ...state,
                    fetchingOne: false,
                    current: undefined
                };
            }
            case constants.resetStorage: {
                return { ...initState };
            }
            default: return state;
        }
    };