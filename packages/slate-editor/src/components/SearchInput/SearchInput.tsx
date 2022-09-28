import React, { type ReactElement, useMemo, useReducer } from 'react';

import { useDebounce, useFunction, useKeyboardNavigation, useLatest, useMount } from '#lib';

import { type Props as BaseProps, Input } from '../Input';

import * as OptionModule from './Option';
import { createReducer } from './reducer';
import styles from './SearchInput.module.scss';
import type { Suggestion } from './types';

export interface Props<T> extends Omit<BaseProps, 'loading' | 'value'> {
    getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
    renderSuggestion: (props: {
        id: Suggestion<T>['id'];
        value: T;
        active: boolean;
        disabled: boolean;
        loading: boolean;
        query: string;
        onSelect: () => void;
    }) => ReactElement;
    query: string;
}

export function SearchInput<T = unknown>({
    getSuggestions,
    renderSuggestion,
    query,
    onKeyDown,
    ...attributes
}: Props<T>) {
    const reducer = useMemo(() => createReducer<T>(), []);
    const initialState = useMemo(() => reducer(undefined, { type: undefined }), [reducer]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const latest = useLatest({ state });

    const loading = state.loading[query] ?? false;
    const suggestions = (state.searchResults[query] ?? [])
        .map((id) => state.suggestions[id])
        .filter((x): x is Suggestion<T> => Boolean(x));

    const handleSelect = useFunction((suggestion: Suggestion<T>) => {
        console.log('Selected', suggestion);
    });

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
            <ul className={styles.Suggestions}>
                {suggestions.map((suggestion) => (
                    <li key={suggestion.id}>
                        {renderSuggestion({
                            id: suggestion.id,
                            value: suggestion.value,
                            active: active?.id === suggestion.id,
                            loading,
                            disabled: suggestion.disabled ?? false,
                            query,
                            onSelect: () => handleSelect(suggestion),
                        })}
                    </li>
                ))}
            </ul>
        </Input>
    );
}

export namespace SearchInput {
    export const Option = OptionModule.Option;
}

function isNotDisabled<T>(suggestion: Suggestion<T>) {
    return !suggestion.disabled;
}
