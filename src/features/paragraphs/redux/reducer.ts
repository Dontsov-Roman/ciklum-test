import { AnyAction } from "redux/lib/redux";
import constants from "./constants";
import Factory, { ISimpleState, FactoryByIndex } from "../../../redux/reducers/factory";
import { List } from "immutable";
import { IParagraph } from "../repo";
const initState = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    data: List()
};
const defaultReducer = Factory<IParagraph, ISimpleState<IParagraph>>(constants, initState);
const byIndexReducer = FactoryByIndex<IParagraph, ISimpleState<IParagraph>>(constants, initState);

export default (state: ISimpleState<IParagraph> = initState, action: AnyAction) =>
    byIndexReducer(defaultReducer(state, action), action);