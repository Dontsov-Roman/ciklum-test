import axios from "axios";
import { stringify } from "query-string";
import IRepository, { IParams, generalUrl } from "../../repository/IRepository";

export interface IParagraph {
    article: string;
    text: string;
}
export interface IResponse {
    paragraphs: string[];
    title: string;
}

const repository: IRepository<IParagraph> = {
    getAll: async (params?: IParams) => {
        try {
            let url: string = `${generalUrl}/article`;
            if (params) {
                url = `${url}?${stringify(params)}`;
            }
            const { data: { paragraphs }, status } = await axios.get<IResponse>(url);
            const data: IParagraph[] = [];
            if (status < 400 && paragraphs && paragraphs.length) {
                paragraphs.map(article => data.push({
                    article,
                    text: ""
                }));
            }
            return data;
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