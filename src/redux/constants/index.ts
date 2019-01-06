export default interface IConstants {
    getAllRequest: string;
    getAllSuccess: string;
    getAllFail: string;
    getByIdRequest: string;
    getByIdSuccess: string;
    getByIdFail: string;
    updateByIndex: string;
    removeByIndex?: string;
    [key: string]: string;
}