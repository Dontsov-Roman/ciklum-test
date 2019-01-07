import IConstants, { IConstantsCreate, IConstantsByIndex } from "../../../redux/constants";
const constants: IConstants & IConstantsCreate & IConstantsByIndex = {
    getAllRequest: "SUGGESTIONS_GET_ALL_REQUEST",
    getAllSuccess: "SUGGESTIONS_GET_ALL_SUCCESS",
    getAllFail: "SUGGESTIONS_GET_ALL_FAIL",
    getByIdRequest: "SUGGESTIONS_GET_BY_ID_REQUEST",
    getByIdSuccess: "SUGGESTIONS_GET_GET_BY_ID_REQUEST",
    getByIdFail: "SUGGESTIONS_GET_GET_BY_ID_FAIL",
    removeByIndex: "SUGGESTIONS_REMOVE_BY_INDEX",
    updateByIndex: "SUGGESTIONS_UPDATE_BY_INDEX",
    createItemRequest: "SUGGESTIONS_CREATE_ITEM_REQUEST",
    createItemSuccess: "SUGGESTIONS_CREATE_ITEM_SUCCESS",
    createItemFail: "SUGGESTIONS_CREATE_ITEM_FAIL",
};
export default constants;