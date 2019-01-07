import { List } from "immutable";
import constants from "./constants";
import Factory, { ISimpleState, FactoryWithCreate } from "../../../redux/reducers/factory";
import { ISuggestion } from "../repo";
import { AnyAction } from "redux/lib/redux";

interface Action<Payload> extends AnyAction {
    payload: Payload;
}
interface IData<T> {
    data: List<T>;
}

export interface IParagraph extends IData<ISuggestion> {
    paragraphId: string | number;
    originalText: string;
}
export { ISuggestion };
export interface IArticle extends IData<IParagraph> {
    articleUrl: string;
}

const initState: ISimpleState<IArticle> = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    data: List<IArticle>()
};
const recursiveToArray = (data) => {
    return data.map(d => {
        const data = d.data && d.data.toArray ? d.data.toArray() : [];
        return { ...d, data: { ...data, data: recursiveToArray(data.data) } };
    });
};
const groupReducer = (
    state: ISimpleState<IArticle> = initState,
    action: Action<ISuggestion[]>
): ISimpleState<IArticle> => {
    let data = List<IArticle>();
    action.payload.map(suggestion => {
        const articleIndex = data.findIndex(article => article.articleUrl === suggestion.articleUrl);
        let article: IArticle = data.get(articleIndex);
        let paragraph: IParagraph;
        if (article) {
            const paragraphIndex = article.data.findIndex(
                paragraph => paragraph.paragraphId === suggestion.paragraphId
            );
            paragraph = article.data.get(paragraphIndex);
            if (paragraph) {
                const foundSuggestion = paragraph.data.find(({ id }) => id === suggestion.id);
                if (!foundSuggestion) {
                    paragraph.data = paragraph.data.push(suggestion);
                    article = {
                        ...article,
                        data: article.data.set(paragraphIndex, paragraph)
                    };
                }
            } else {
                article = {
                        ...article,
                        data: article.data.push({
                            paragraphId: suggestion.paragraphId,
                            originalText: suggestion.originalText,
                            data: List<ISuggestion>().push(suggestion)
                        })
                };
            }
            data = data.set(articleIndex, article);
        } else {
            data = data.push({
                articleUrl: suggestion.articleUrl,
                data: List<IParagraph>().push({
                    paragraphId: suggestion.paragraphId,
                    originalText: suggestion.originalText,
                    data: List<ISuggestion>().push(suggestion)
                })
            });
        }
    });
    return { ...state, fetching: false, data };
};
const defaultReducer = Factory<IArticle, ISimpleState<IArticle>>(constants, initState);
const createReducer = FactoryWithCreate<IArticle, ISimpleState<IArticle>>(constants, initState);
export default (state: ISimpleState<IArticle> = initState, action: AnyAction) => {
    switch (action.type) {
        case constants.getAllSuccess:
            return groupReducer(state, action);
        default: return createReducer(defaultReducer(state, action), action);
    }
};