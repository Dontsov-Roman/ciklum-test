export default interface IConstants {
    getAllRequest: string;
    getAllSuccess: string;
    getAllFail: string;
    getByIdRequest: string;
    getByIdSuccess: string;
    getByIdFail: string;
    resetStorage: string;
}

export interface IConstantsByIndex {
    updateByIndex: string;
    removeByIndex: string;
}

export interface IConstantsCreate {
    createItemRequest: string;
    createItemSuccess: string;
    createItemFail: string;
}

export interface IConstantsLazyLoad {
    lazyLoadRequest: string;
    lazyLoadSuccess: string;
    lazyLoadFail: string;
    lazyLoadSetPage: string;
}