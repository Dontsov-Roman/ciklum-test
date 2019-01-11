export interface IParams {
    [key: string]: any;
}
export interface IParamsLazyLoad extends IParams {
    page: number;
    per_page: number;
}
export const generalUrl = "http://localhost:3022/api";
export default interface IRepository<T, C = any> {
    getAll: (params?: IParams) => Promise<T[]>;
    getOne: (id: string | number) => Promise<T>;
    remove: (id: string | number) => Promise<boolean>;
    create?: (item: T) => Promise<C>;
    update?: (item: T) => Promise<boolean>;
}