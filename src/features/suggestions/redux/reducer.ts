import { List } from "immutable";
import constants from "./constants";
import Factory, { ISimpleState, FactoryWithCreate } from "../../../redux/reducers/factory";
import { ISuggestion } from "../repo";
import { AnyAction } from "redux/lib/redux";

interface Action<Payload> extends AnyAction {
    payload: Payload;
}

export interface IParagraph {
    paragraphId: string | number;
    originalText: string;
    data: List<ISuggestion>;
}
export { ISuggestion };
export interface IArticle {
    articleUrl: string;
    data: List<IParagraph>;
}

const initState: ISimpleState<IArticle> = {
    fetching: false,
    fetchingOne: false,
    current: undefined,
    data: List<IArticle>()
};
const groupReducer = (
    state: ISimpleState<IArticle> = initState,
    action: Action<ISuggestion[]>
): ISimpleState<IArticle> => {
    let data = List<IArticle>();
    action.payload.map(suggestion => {
        const articleIndex = data.findIndex(article => article.articleUrl === suggestion.articleUrl);
        let article: IArticle = data[articleIndex];
        let paragpraph: IParagraph;
        if (article) {
            paragpraph = article.data.find(
                paragpraph => paragpraph.paragraphId === suggestion.paragraphId
            );
            if (paragpraph) {
                const foundSuggestion = paragpraph.data.find(({ id }) => id === suggestion.id);
                if (!foundSuggestion) paragpraph.data = paragpraph.data.push(suggestion);
            } else {
                article = {
                        ...article,
                        data: article.data.push({
                            paragraphId: suggestion.paragraphId,
                            originalText: suggestion.originalText,
                            data: List<ISuggestion>().push(suggestion)
                        })
                };
                data = data.set(articleIndex, article);
            }
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