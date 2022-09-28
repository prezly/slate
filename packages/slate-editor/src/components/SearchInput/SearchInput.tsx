import React, { type ReactElement, useMemo, useReducer } from 'react';

import {
    useDebounce,
    useFunction,
    useKeyboardNavigation,
    useLatest,
    useMemoryBuffer,
    useMount,
} from '#lib';

import { type Props as BaseProps, Input } from '../Input';

import * as OptionsModule from './Option';
import { createReducer } from './reducer';
import * as SuggestionsModule from './Suggestions';
import { Suggestions } from './Suggestions';
import type { Suggestion } from './types';

export interface Props<T> extends Omit<BaseProps, 'loading' | 'value' | 'onSelect'> {
    getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
    renderSuggestion?: (props: SuggestionsModule.RenderSuggestionProps<T>) => ReactElement;
    renderSuggestions?: (props: SuggestionsModule.Props<T>) => ReactElement;
    query: string;
    onSelect: (suggestion: Suggestion<T>) => void;
}

const EMPTY_SUGGESTIONS: never[] = [];

export function SearchInput<T = unknown>({
    getSuggestions,
    renderSuggestion = defaultRenderSuggestion,
    renderSuggestions = defaultRenderSuggestions,
    query,
    onKeyDown,
    onSelect,
    ...attributes
}: Props<T>) {
    const reducer = useMemo(() => createReducer<T>(), []);
    const initialState = useMemo(() => reducer(undefined, { type: undefined }), [reducer]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const latest = useLatest({ state });

    const loading = state.loading[query] ?? false;
    const foundSuggestions = state.searchResults[query]
        ? state.searchResults[query]
              .map((id) => state.suggestions[id])
              .filter((x): x is Suggestion<T> => Boolean(x))
        : undefined;

    const suggestions =
        useMemoryBuffer(foundSuggestions, !loading && foundSuggestions !== undefined) ??
        EMPTY_SUGGESTIONS;

    const handleSelect = useFunction(onSelect);

    const [active, handleNavigationKeyDown] = useKeyboardNavigation(
        suggestions,
        handleSelect,
        isNotDisabled,
    );

    async function search(query: string) {
        if (latest.current.state.loading[query]) {
            return;
        }

        dispatch({ type: 'search', query });
        const suggestions = await getSuggestions(query);
        dispatch({ type: 'results', query, suggestions });
    }

    useMount(async () => {
        await search('');
    });

    useDebounce(
        async () => {
            await search(query);
        },
        300,
        [query],
    );

    return (
        <Input
            {...attributes}
            onKeyDown={(event) => {
                handleNavigationKeyDown(event);
                onKeyDown?.(event);
            }}
            loading={loading}
            value={query}
            withSuggestions={suggestions.length > 0}
        >
            {renderSuggestions({
                active,
                loading,
                query,
                renderSuggestion,
                suggestions,
                onSelect: handleSelect,
            })}
        </Input>
    );
}

export namespace SearchInput {
    export const Option = OptionsModule.Option;
    export const Suggestions = SuggestionsModule.Suggestions;
}

function isNotDisabled<T>(suggestion: Suggestion<T>) {
    return !suggestion.disabled;
}

function defaultRenderSuggestions<T>(props: SuggestionsModule.Props<T>) {
    return <Suggestions<T> {...props} />;
}

function defaultRenderSuggestion<T>({ value }: SuggestionsModule.RenderSuggestionProps<T>) {
    return <>{typeof value === 'string' ? value : JSON.stringify(value)}</>;
}
