import type { ReactElement } from 'react';
import React, { useMemo, useReducer, useState } from 'react';
import { RootCloseWrapper } from 'react-overlays';

import {
    useDebounce,
    useFunction,
    useKeyboardNavigation,
    useLatest,
    useMemoryBuffer,
    useMount,
} from '#lib';

import { Input, type Props as BaseProps } from '../Input';

import * as EmptyModule from './Empty';
import * as OptionsModule from './Option';
import * as PanelModule from './Panel';
import { createReducer } from './reducer';
import * as SuggestionsModule from './Suggestions';
import type { Props, Suggestion } from './types';

export interface Props<T> extends Omit<BaseProps, 'loading' | 'value' | 'onSelect'> {
    getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
    renderEmpty?: (props: Props.Empty) => ReactElement | null;
    renderSuggestion?: (props: Props.Option<T>) => ReactElement | null;
    renderSuggestions?: (props: Props.Suggestions<T>) => ReactElement | null;
    query: string;
    onSelect: (suggestion: Suggestion<T>) => void;
}

const EMPTY_SUGGESTIONS: never[] = [];

export function SearchInput<T = unknown>({
    getSuggestions,
    renderEmpty = defaultRenderEmpty,
    renderSuggestion = defaultRenderSuggestion,
    renderSuggestions = defaultRenderSuggestions,
    query,
    onKeyDown,
    onSelect,
    ...attributes
}: Props<T>) {
    const reducer = useMemo(() => createReducer<T>(), []);
    const initialState = useMemo(() => reducer(undefined, { type: undefined }), [reducer]);
    const [open, setOpen] = useState(false);
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
        <RootCloseWrapper onRootClose={() => setOpen(false)}>
            <Input
                {...attributes}
                onFocus={() => setOpen(true)}
                onKeyDown={(event) => {
                    handleNavigationKeyDown(event);
                    onKeyDown?.(event);
                }}
                loading={loading}
                value={query}
                withSuggestions={open}
            >
                {open &&
                    (suggestions.length === 0
                        ? renderEmpty({ loading, query })
                        : renderSuggestions({
                              active,
                              loading,
                              query,
                              suggestions,
                              onSelect,
                              children: suggestions.map((suggestion) =>
                                  renderSuggestion({
                                      suggestion,
                                      active: suggestion.id === active?.id,
                                      disabled: Boolean(suggestion.disabled),
                                      onSelect: () => handleSelect(suggestion),
                                      children: suggestion.value,
                                  }),
                              ),
                          }))}
            </Input>
        </RootCloseWrapper>
    );
}

export namespace SearchInput {
    export const Empty = EmptyModule.Empty;
    export const Option = OptionsModule.Option;
    export const Panel = PanelModule.Panel;
    export const Suggestions = SuggestionsModule.Suggestions;
}

function defaultRenderEmpty({ loading, query }: Props.Empty) {
    return <SearchInput.Empty loading={loading} query={query} />;
}

function defaultRenderSuggestion<T>({
    suggestion,
    active,
    disabled,
    onSelect,
    children,
}: Props.Option<T>) {
    return (
        <SearchInput.Option<T>
            key={suggestion.id}
            active={active}
            disabled={disabled}
            onClick={onSelect}
            suggestion={suggestion}
        >
            {children}
        </SearchInput.Option>
    );
}

function defaultRenderSuggestions<T>({ query, suggestions, children }: Props.Suggestions<T>) {
    return (
        <SearchInput.Suggestions<T> query={query} suggestions={suggestions}>
            {children}
        </SearchInput.Suggestions>
    );
}

function isNotDisabled<T>(suggestion: Suggestion<T>) {
    return !suggestion.disabled;
}
