import IConstants from "../constants";
import { Reducer, AnyAction } from "redux";
import { List } from "immutable";

export interface ISimpleState<Item> {
    fetching: boolean;
    data: List<Item>;
    fetchingOne: boolean;
    current?: Item;
    [key: string]: any;
}

export default <Item, State extends ISimpleState<Item>>(constants: IConstants, initState: State): Reducer<State, AnyAction> =>
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
            case constants.removeByIndex: {
                return {
                    ...state,
                    data: state.data.delete(action.payload)
                };
            }
            default: return state;
        }
    };