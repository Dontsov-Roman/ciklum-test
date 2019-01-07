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
export interface ISuggestionState extends ISimpleState<IArticle> {
    showApproved: boolean;
}
const initState: ISuggestionState = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    showApproved: false,
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
    state: ISuggestionState = initState,
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

const defaultReducer = Factory<IArticle, ISuggestionState>(constants, initState);
const createReducer = FactoryWithCreate<IArticle, ISuggestionState>(constants, initState);

export default (state: ISuggestionState = initState, action: AnyAction): ISuggestionState => {
    switch (action.type) {
        case constants.getAllSuccess:
            return groupReducer(state, action);
        case constants.showApprovedToggle: {
            return {
                ...state,
                showApproved: !state.showApproved
            };
        }
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
        case constants.rejectSuggestion: {
            const { id } = action.payload as ISuggestion;
            let articleIndex: number;
            let paragraphIndex: number;
            let newSuggestions: List<ISuggestion>;
            state.data.forEach((article, index) => {
                article.data.forEach((paragraph, pIndex) => {
                    if (!articleIndex && !paragraphIndex) {
                        newSuggestions = paragraph.data.filter(suggestion => {
                            if (suggestion.id === id) {
                                articleIndex = index;
                                paragraphIndex = pIndex;
                                return false;
                            }
                            return true;
                        });
                    }
                });
            });
            if (articleIndex > -1 && paragraphIndex > -1) {
                const newArticle = state.data.get(articleIndex);
                const newParagraph = newArticle.data.get(paragraphIndex);
                newParagraph.data = newSuggestions;
                return {
                    ...state,
                    data: state.data.set(
                        articleIndex,
                        {
                            ...newArticle,
                            data: newArticle.data.set(paragraphIndex, newParagraph)
                        }
                    )
                };
            }
            return state;
        }
        default: return createReducer(defaultReducer(state, action), action);
    }
};