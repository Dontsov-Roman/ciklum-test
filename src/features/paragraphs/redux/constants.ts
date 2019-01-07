import IConstants, { IConstantsByIndex } from "../../../redux/constants";
const constants: IConstants & IConstantsByIndex = {
    getAllRequest: "PARAGRAPHS_GET_ALL_REQUEST",
    getAllSuccess: "PARAGRAPHS_GET_ALL_SUCCESS",
    getAllFail: "PARAGRAPHS_GET_ALL_FAIL",
    getByIdRequest: "PARAGRAPHS_GET_BY_ID_REQUEST",
    getByIdSuccess: "PARAGRAPHS_GET_GET_BY_ID_REQUEST",
    getByIdFail: "PARAGRAPHS_GET_GET_BY_ID_FAIL",
    removeByIndex: "PARAGRAPHS_REMOVE_BY_INDEX",
    updateByIndex: "PARAGRAPHS_UPDATE_BY_INDEX"
};
export default constants;