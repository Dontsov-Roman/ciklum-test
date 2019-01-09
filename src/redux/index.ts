import thunk from "redux-thunk";
import { createStore, Store, applyMiddleware  } from "redux/lib/redux";
import { initState as suggestionsInitState } from "../features/suggestions/redux/reducer";
import { initState as paragraphsInitState } from "../features/paragraphs/redux/reducer";
import reducer from "./reducers";
import { recursiveToArray, recursiveToList } from "./reducers/factory";
import suggestionsAction from "../features/suggestions/redux/actions";
import paragraphsAction from "../features/paragraphs/redux/actions";
import IStore from "./store";

export class AppRedux {
    store: Store<IStore>;
    constructor() {
        this.build();
    }
    private stateLabel = "ciklum-test-storage";
    private build() {
        this.store = this.buildStore();
        this.store.subscribe(() => {
            const state = this.store.getState();

            // Register properties to be synced between local storage and state
            this.saveState(state);

        });
    }
    private buildStore() {
        // Setup the Redux Store
        const persistedState: IStore = this.loadState();

        const store = createStore<IStore, any, any, any>(
            reducer,
            persistedState,
            applyMiddleware(thunk)
        );
        const { suggestions } = store.getState();
        if (suggestions.data.size < 1) store.dispatch(suggestionsAction.getAll());
        // if (paragraphs.data.size < 1) store.dispatch(paragraphsAction.getAll());
        return store;
    }
    private loadState() {
        try {
            const serializedState = localStorage.getItem(this.stateLabel);
            if (serializedState === null) return undefined;
            const fromLocalStorage = JSON.parse(serializedState);
            return {
                paragraphs: {
                    ...paragraphsInitState,
                    ...fromLocalStorage.paragraphs,
                    data: recursiveToList(fromLocalStorage.paragraphs.data)
                },
                suggestions: {
                    ...suggestionsInitState,
                    ...fromLocalStorage.suggestions,
                    data: recursiveToList(fromLocalStorage.suggestions.data)
                }
            };
        } catch (reason) {
            return undefined;
        }
    }
    private saveState(store: IStore) {
        const suggestions: any = { ...store.suggestions };
        const paragraphs: any = { ...store.paragraphs };
        suggestions.data = recursiveToArray(suggestions.data);
        paragraphs.data = recursiveToArray(paragraphs.data);
        localStorage.setItem(this.stateLabel, JSON.stringify({ suggestions, paragraphs }));
        return;
    }
}