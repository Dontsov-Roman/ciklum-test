import IConstants, { IConstantsCreate, IConstantsLazyLoad } from "../../../redux/constants";
interface IConstantsSuggestion {
    removeParagraph: string;
    rejectSuggestion: string;
    setShowApproved: string;
    changeSearchText: string;
}
const constants: IConstants & IConstantsCreate & IConstantsSuggestion & IConstantsLazyLoad = {
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
    setShowApproved: "SUGGESTIONS_SHOW_APPROVED_TOGGLE",
    changeSearchText: "SUGGESTIONS_CHANGE_SEARCH_TEXT",
    lazyLoadFail: "SUGGESTIONS_LAZY_LOAD_FAIL",
    lazyLoadSuccess: "SUGGESTIONS_LAZY_LOAD_SUCCESS",
    lazyLoadRequest: "SUGGESTIONS_LAZY_LOAD_REQUEST",
    lazyLoadSetPage: "SUGGESTIONS_LAZY_LOAD_SET_PAGE",
    resetStorage: "SUGGESTIONS_RESET_STORAGE"
};
export default constants;