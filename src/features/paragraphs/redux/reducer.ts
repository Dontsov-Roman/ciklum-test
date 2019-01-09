import { AnyAction } from "redux/lib/redux";
import constants from "./constants";
import Factory, { ISimpleState, FactoryByIndex } from "../../../redux/reducers/factory";
import { List } from "immutable";
import { IParagraph } from "../repo";
export interface IParagraphsState extends ISimpleState<IParagraph> {
    url: string;
}
export const initState = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    url: "",
    data: List()
};
const defaultReducer = Factory<IParagraph, IParagraphsState>(constants, initState);
const byIndexReducer = FactoryByIndex<IParagraph, IParagraphsState>(constants, initState);

export default (state: IParagraphsState = initState, action: AnyAction) => {
    switch (action.type) {
        case constants.changeUrl: {
            return { ...state, url: action.payload };
        }
        default: return byIndexReducer(defaultReducer(state, action), action);
    }
};