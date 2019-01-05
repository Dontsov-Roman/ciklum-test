export interface IParams {
    [key: string]: any;
}
export const generalUrl = "localhost:3022/api";
export default interface IRepository<T> {
    getAll: (params?: IParams) => Promise<T[]>;
    getOne: (id: string | number) => Promise<T>;
    remove: (id: string | number) => Promise<boolean>;
}