import { List } from "immutable";
import constants from "./constants";
import Factory, { ISimpleState, FactoryWithCreate } from "../../../redux/reducers/factory";
import { ISuggestion } from "../repo";
import { AnyAction } from "redux/lib/redux";

const initState: ISimpleState<ISuggestion> = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    data: List<ISuggestion>()
};

const defaultReducer = Factory<ISuggestion, ISimpleState<ISuggestion>>(constants, initState);
const createReducer = FactoryWithCreate<ISuggestion, ISimpleState<ISuggestion>>(constants, initState);
export default (state: ISimpleState<ISuggestion> = initState, action: AnyAction) =>
    createReducer(defaultReducer(state, action), action);