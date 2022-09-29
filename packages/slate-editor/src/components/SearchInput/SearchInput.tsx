import type { ComponentType } from 'react';
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
import type { Props as CommonProps, Suggestion } from './types';

export interface Props<T> extends Omit<BaseProps, 'loading' | 'value' | 'onSelect'> {
    getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
    components?: Partial<SearchInput.Components<T>>;
    query: string;
    onSelect: (suggestion: Suggestion<T>) => void;
}

const EMPTY_SUGGESTIONS: never[] = [];

export function SearchInput<T = unknown>({
    getSuggestions,
    components = {},
    query,
    onKeyDown,
    onSelect,
    ...attributes
}: Props<T>) {
    const { Suggestions = SearchInput.Suggestions } = components;
    const { Option = SearchInput.Option } = components;
    const { Empty = SearchInput.Empty } = components;

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
                    (suggestions.length === 0 ? (
                        <Empty loading={loading} query={query} />
                    ) : (
                        <Suggestions
                            active={active}
                            loading={loading}
                            query={query}
                            suggestions={suggestions}
                            onSelect={handleSelect}
                        >
                            {suggestions.map((suggestion) => (
                                <Option
                                    key={suggestion.id}
                                    id={suggestion.id}
                                    active={suggestion.id === active?.id}
                                    disabled={Boolean(suggestion.disabled)}
                                    value={suggestion.value}
                                    onSelect={() => handleSelect(suggestion)}
                                >
                                    <Debug value={suggestion.value} />
                                </Option>
                            ))}
                        </Suggestions>
                    ))}
            </Input>
        </RootCloseWrapper>
    );
}

export namespace SearchInput {
    export const Empty = EmptyModule.Empty;
    export const Option = OptionsModule.Option;
    export const Panel = PanelModule.Panel;
    export const Suggestions = SuggestionsModule.Suggestions;

    export interface Components<T> {
        Suggestions: ComponentType<CommonProps.Suggestions<T>>;
        Empty: ComponentType<CommonProps.Empty>;
        Option: ComponentType<CommonProps.Option<T>>;
    }
}

function isNotDisabled<T>(suggestion: Suggestion<T>) {
    return !suggestion.disabled;
}

function Debug<T>(props: { value: T }) {
    const { value } = props;
    if (typeof value === 'string') {
        return <>{value}</>;
    }
    return <>{JSON.stringify(value)}</>;
}
