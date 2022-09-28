import React, { type ReactElement, useMemo, useReducer } from 'react';

import { useDebounce, useLatest, useMount } from '#lib';

import { type Props as BaseProps, Input } from '../Input';

import { createReducer } from './reducer';
import styles from './SearchInput.module.scss';
import type { Suggestion } from './types';

export interface Props<T> extends Omit<BaseProps, 'loading' | 'value'> {
    getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
    renderSuggestion: (props: {
        active: boolean;
        disabled: boolean;
        loading: boolean;
        query: string;
        id: Suggestion<T>['id'];
        value: T;
    }) => ReactElement;
    query: string;
}

export function SearchInput<T = unknown>({
    getSuggestions,
    renderSuggestion,
    query,
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
            loading={loading}
            value={query}
            withSuggestions={suggestions.length > 0}
        >
            <ul className={styles.Suggestions}>
                {suggestions.map(({ id, value, disabled }) => (
                    <li key={id}>
                        {renderSuggestion({
                            active: false,
                            loading,
                            disabled: Boolean(disabled),
                            id: id,
                            query,
                            value,
                        })}
                    </li>
                ))}
            </ul>
        </Input>
    );
}
