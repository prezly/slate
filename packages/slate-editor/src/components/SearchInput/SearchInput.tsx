import React, { type ReactElement, useMemo, useReducer } from 'react';

import { useDebounce, useLatest, useMount } from '#lib';

import { type Props as BaseProps, Input } from '../Input';

import { createReducer } from './reducer';
import type { Suggestion } from './types';

export interface Props<T> extends BaseProps {
    getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
    renderSuggestion: (props: {
        active: boolean;
        disabled: boolean;
        search: string;
        value: T;
    }) => ReactElement;
}

export function SearchInput<T = unknown>({ getSuggestions, value, ...attributes }: Props<T>) {
    const reducer = useMemo(() => createReducer<T>(), []);
    const initialState = useMemo(() => reducer(undefined, { type: undefined }), [reducer]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const latest = useLatest({ state });

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
            await search(value);
        },
        300,
        [value],
    );

    return <Input {...attributes} value={value} />;
}
