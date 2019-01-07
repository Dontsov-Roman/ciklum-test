import IConstants, { IConstantsCreate, IConstantsByIndex } from "../../../redux/constants";
interface IConstantsSuggestion {
    removeParagraph: string;
    rejectSuggestion: string;
    showApprovedToggle: string;
}
const constants: IConstants & IConstantsCreate & IConstantsSuggestion = {
    getAllRequest: "SUGGESTIONS_GET_ALL_REQUEST",
    getAllSuccess: "SUGGESTIONS_GET_ALL_SUCCESS",
    getAllFail: "SUGGESTIONS_GET_ALL_FAIL",
    getByIdRequest: "SUGGESTIONS_GET_BY_ID_REQUEST",
    getByIdSuccess: "SUGGESTIONS_GET_GET_BY_ID_REQUEST",
    getByIdFail: "SUGGESTIONS_GET_GET_BY_ID_FAIL",
    createItemRequest: "SUGGESTIONS_CREATE_ITEM_REQUEST",
    createItemSuccess: "SUGGESTIONS_CREATE_ITEM_SUCCESS",
    createItemFail: "SUGGESTIONS_CREATE_ITEM_FAIL",
    removeParagraph: "SUGGESTIONS_REMOVE_PARAGRAPH",
    rejectSuggestion: "SUGGESTIONS_REJECT_SUGGESTION",
    showApprovedToggle: "SUGGESTIONS_SHOW_APPROVED_TOGGLE"
};
export default constants;