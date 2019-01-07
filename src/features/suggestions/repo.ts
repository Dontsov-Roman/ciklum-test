import axios from "axios";
import { stringify } from "query-string";
import IRepository, { IParams, generalUrl } from "../../repository/IRepository";

interface ISuggestionOnCreate {
    _id: string;
    text: string;
    paragraphId: string;
    isApproved: boolean;
}

interface IRepositorySuggestion extends IRepository<ISuggestion, ISuggestionOnCreate> {
    removeByParagraphId: (id: string | number) => Promise<boolean>;
}

export interface ISuggestion {
    id?: string | number;
    paragraphId: string | number;
    originalText: string;
    usersText: string;
    articleUrl?: string;
    isApproved?: boolean;
}

const repository: IRepositorySuggestion = {
    getAll: async (params?: IParams) => {
        try {
            let url: string = `${generalUrl}/suggestion`;
            if (params) {
                url = `${url}?${stringify(params)}`;
            }
            const { data, status } = await axios.get<ISuggestion[]>(url);
            if (status < 400 && data && data.length) {
                return data;
            }
            return [];
        } catch (e) {
            console.warn(e);
            return [];
        }
    },
    getOne: async (id) => {
        return {} as ISuggestion;
    },
    remove: async (id) => {
        try {
            if (!id) return false;
            const url: string = `${generalUrl}/suggestion/${id}`;
            const { status } = await axios.delete(url);
            if (status < 400) {
                return true;
            }
            return false;
        }
        catch(e) {
            console.warn(e);
            return false;
        }
    },
    removeByParagraphId: async id => {
        try {
            if (!id) return false;
            const url: string = `${generalUrl}/suggestions/${id}`;
            const { status } = await axios.delete(url);
            if (status < 400) {
                return true;
            }
            return false;
        }
        catch(e) {
            console.warn(e);
            return false;
        }
    },
    create: async (suggestion) => {
        try {
            const url: string = `${generalUrl}/suggestion`;
            const {
                data
            } = await axios.post<ISuggestionOnCreate>(url, suggestion);
            return data;
        }
        catch(e) {
            console.warn(e);
            return undefined;
        }
    },
    update: async ({ id }) => {
        try {
            if (!id) return false;
            const url: string = `${generalUrl}/suggestion/${id}`;
            const { status } = await axios.put<boolean>(url);
            if (status < 400) {
                return true;
            }
            return false;
        }
        catch(e) {
            console.warn(e);
            return false;
        }
    }
};

export default repository;