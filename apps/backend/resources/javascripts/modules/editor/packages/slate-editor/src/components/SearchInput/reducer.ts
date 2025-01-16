import combineReducers from 'combine-reducers';

import type { Suggestion } from './types';

type Query = string;

export interface State<T> {
    loading: Partial<Record<string, boolean>>;
    searchResults: Partial<Record<Query, Suggestion<T>['id'][]>>;
    suggestions: Partial<Record<Suggestion<T>['id'], Suggestion<T>>>;
}

export type InitializeAction = {
    type: undefined;
};

export type SearchAction = {
    type: 'search';
    query: Query;
};

export type SearchResultsAction<T> = {
    type: 'results';
    query: Query;
    suggestions: Suggestion<T>[];
};

export type Action<T> = InitializeAction | SearchAction | SearchResultsAction<T>;

export type Reducer<T> = (state: State<T> | undefined, action: Action<T>) => State<T>;

export function createReducer<T>(): Reducer<T> {
    function suggestions<T>(state: State<T>['suggestions'] = {}, action: Action<T>) {
        switch (action.type) {
            case 'results': {
                const results = Object.fromEntries(
                    action.suggestions.map((suggestion) => [suggestion.id, suggestion]),
                );
                return { ...state, ...results };
            }
            default:
                return state;
        }
    }

    function searchResults<T>(state: State<T>['searchResults'] = {}, action: Action<T>) {
        switch (action.type) {
            case 'results': {
                const ids = action.suggestions.map((suggestion) => suggestion.id);
                return { ...state, [action.query]: ids };
            }
            default:
                return state;
        }
    }

    function loading<T>(state: State<T>['loading'] = {}, action: Action<T>) {
        switch (action.type) {
            case 'search':
                return { ...state, [action.query]: true };
            case 'results':
                return { ...state, [action.query]: false };
            default:
                return state;
        }
    }

    return combineReducers({
        loading,
        searchResults,
        suggestions,
    });
}
