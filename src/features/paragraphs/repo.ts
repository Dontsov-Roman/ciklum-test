import axios from "axios";
import { stringify } from "query-string";
import IRepository, { IParams, generalUrl } from "../../repository/IRepository";

export interface IParagraph {
    article: string;
    text: string;
}

const repository: IRepository<IParagraph> = {
    getAll: async (params?: IParams) => {
        try {
            let url: string = `${generalUrl}/article`;
            if (params) {
                url = `${url}${stringify}`;
                console.warn(url);
            }
            const { data, status } = await axios.get<IParagraph[]>(url);
            if (status < 300)
                return data;
            return [];
        } catch (e) {
            console.warn(e);
            return [];
        }
    },
    getOne: async (id: string | number) => {
        return {} as IParagraph;
    },
    remove: async (id: string | number) => {
        return true;
    }
};
export default repository;