import axios from "axios";
import { stringify } from "query-string";
import IRepository, { IParams, generalUrl } from "../../repository/IRepository";

export interface ISuggestion {
    paragraphId: string | number;
    text: string;
    isApproved: boolean;
}
export interface IResponse {
    suggestions: ISuggestion[];
    title: string;
}

const repository: IRepository<ISuggestion> = {
    getAll: async (params?: IParams) => {
        try {
            let url: string = `${generalUrl}/suggestion`;
            if (params) {
                url = `${url}?${stringify(params)}`;
            }
            const { data: { suggestions }, status } = await axios.get<IResponse>(url);
            const data: ISuggestion[] = [];
            if (status < 400 && suggestions && suggestions.length) {
                return suggestions;
            }
            return data;
        } catch (e) {
            console.warn(e);
            return [];
        }
    },
    getOne: async (id) => {
        return {} as ISuggestion;
    },
    remove: async (id) => {
        return true;
    },
    create: async (suggestion) => {
        return suggestion;
    },
    update: async (suggestion) => {
        return true;
    }
};

export default repository;