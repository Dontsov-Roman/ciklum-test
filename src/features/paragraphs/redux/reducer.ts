import constants from "./constants";
import Factory, { ISimpleState } from "../../../redux/reducers/factory";
import { List } from "immutable";
import { IParagraph } from "../repo";

export default Factory<IParagraph, ISimpleState<IParagraph>>(constants, {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    data: List()
});