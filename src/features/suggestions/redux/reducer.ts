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
    articleUrl: string;
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
export const recursiveToArray = (list?: List<IData<any>>) => {
    const arr = [];
    if (list && list.forEach) {
        list.forEach(d => {
            const data = d.data && d.data.toArray ? d.data.toArray() : [];
            data.forEach(d => {
                if (d.data) {
                    d.data = recursiveToArray(d.data);
                }
            });
            arr.push({
                ...d,
                data
            });
        });
    }
    return arr;
};

const groupReducer = (
    state: ISimpleState<IArticle> = initState,
    action: Action<ISuggestion[]>
) => {
    let articles = List<IArticle>();
    let paragraphs = List<IParagraph>();
    const uniqArticles = new Set<string>();
    const uniqParagraphs = new Set<string | number>();
    action.payload.map(suggestion => {
        if (!uniqArticles.has(suggestion.articleUrl)) {
            uniqArticles.add(suggestion.articleUrl);
            articles = articles.push({
                articleUrl: suggestion.articleUrl,
                data: List<IParagraph>()
            });
        }
        if (!uniqParagraphs.has(suggestion.paragraphId)) {
            uniqParagraphs.add(suggestion.paragraphId);
            paragraphs = paragraphs.push({
                paragraphId: suggestion.paragraphId,
                originalText: suggestion.originalText,
                articleUrl: suggestion.articleUrl,
                data: List<ISuggestion>()
            });
        }
    });
    action.payload.map(suggestion => {
            paragraphs.forEach(paragraph => {
                if (paragraph.paragraphId === suggestion.paragraphId) {
                    paragraph.data = paragraph.data.push(suggestion);
                }
            });
    });
    paragraphs.forEach(paragraph => {
        articles.forEach(article => {
            if (article.articleUrl === paragraph.articleUrl) {
                article.data = article.data.push(paragraph);
            }
        });
    });
    return {
        ...state,
        fetching: false,
        data: articles
    };
};

const defaultReducer = Factory<IArticle, ISimpleState<IArticle>>(constants, initState);
const createReducer = FactoryWithCreate<IArticle, ISimpleState<IArticle>>(constants, initState);
export default (state: ISimpleState<IArticle> = initState, action: AnyAction) => {
    switch (action.type) {
        case constants.getAllSuccess:
            return groupReducer(state, action);
        case constants.removeParagraph: {
            const { paragraphId } = action.payload as IParagraph;
            let articleIndex: number;
            let newParagraphs: List<IParagraph>;
            state.data.forEach((article, index) => {
                newParagraphs = article.data.filter(paragraph => {
                    if (paragraph.paragraphId === paragraphId) {
                        articleIndex = index;
                        return false;
                    }
                    return true;
                });
            });
            if (articleIndex > -1) {
                const newArticle = state.data.get(articleIndex);
                newArticle.data = newParagraphs;

                return {
                    ...state,
                    data: state.data.set(
                        articleIndex,
                        newArticle
                    )
                };
            }
            return state;
        }
        case constants.removeParagraph: {
            const suggestion: ISuggestion = action.payload;
            return {
                ...state
            };
        }
        default: return createReducer(defaultReducer(state, action), action);
    }
};