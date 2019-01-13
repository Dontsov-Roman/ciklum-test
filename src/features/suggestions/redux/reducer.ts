import { List } from "immutable";
import constants from "./constants";
import Factory, { FactoryWithCreate, IData, ILazyLoadStateSimple, FactoryWithLazyLoad } from "../../../redux/reducers/factory";
import { ISuggestion } from "../repo";
import { AnyAction } from "redux/lib/redux";

interface Action<Payload> extends AnyAction {
    payload: Payload;
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
export interface ISuggestionState extends ILazyLoadStateSimple<IArticle> {
    showApproved: boolean;
    searchText: string;
    rawData: ISuggestion[];
}
export const initState: ISuggestionState = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    showApproved: false,
    searchText: "",
    page: 1,
    per_page: 5,
    fetchingLazyLoad: false,
    data: List<IArticle>(),
    rawData: []
};

const groupReducer = (
    state: ISuggestionState = initState,
    action: Action<ISuggestion[]>
) => {
    let articles = List<IArticle>();
    let paragraphs = List<IParagraph>();
    const uniqArticles = new Set<string>();
    const uniqParagraphs = new Set<string | number>();
    const { searchText } = state;
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
                if (
                    paragraph.paragraphId === suggestion.paragraphId
                ) {
                    paragraph.data = paragraph.data.push(suggestion);
                }
            });
    });
    paragraphs.forEach(paragraph => {
        articles.forEach(article => {
            if (
                article.articleUrl === paragraph.articleUrl &&
                paragraph.originalText.search(searchText) > -1
            ) {
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
const lazyloadReducer = FactoryWithLazyLoad<IArticle, ISuggestionState>(constants, initState);

export default (state: ISuggestionState = initState, action: AnyAction): ISuggestionState => {
    switch (action.type) {
        case constants.getAllSuccess: {
            const groupedState = groupReducer(state, action);
            return { ...groupedState, rawData: action.payload, page: 1 };
        }
        case constants.setShowApproved: {
            return {
                ...state,
                showApproved: action.payload
            };
        }
        case constants.changeSearchText: {
            return { ...state, searchText: action.payload };
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
        case constants.lazyLoadSuccess: {
            const uniqIds = new Set();
            let rawData: ISuggestion[] = [];
            rawData = rawData.concat(state.rawData);
            state.rawData.map(({ id }) => uniqIds.add(id));
            action.payload.data.map((suggestion: ISuggestion) => {
                if (!uniqIds.has(suggestion.id)) {
                    rawData.push(suggestion);
                }
            });
            const groupedState = groupReducer(state, { ...action, payload: rawData });
            return {
                ...groupedState,
                rawData,
                fetchingLazyLoad: false,
                page: action.payload.page,
                fetching: false
            };
        }
        default: return lazyloadReducer(createReducer(defaultReducer(state, action), action), action);
    }
};