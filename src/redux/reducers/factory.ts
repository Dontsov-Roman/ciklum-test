import IConstants, { IConstantsCreate, IConstantsByIndex } from "../constants";
import { Reducer, AnyAction } from "redux/lib/redux";
import { List } from "immutable";

export interface ISimpleState<Item> {
    fetching: boolean;
    data: List<Item>;
    fetchingOne: boolean;
    current?: Item;
    [key: string]: any;
}
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
                    data: List<Item>(action.payload)
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
            default: return state;
        }
    };