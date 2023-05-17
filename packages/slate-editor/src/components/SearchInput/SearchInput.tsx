import type { ReactElement, Ref, ReactNode } from 'react';
import { useRef } from 'react';
import React, { useMemo, useReducer, useState } from 'react';
import { useRootClose } from 'react-overlays';

import { mergeRefs } from '#lib';
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
import type { Suggestion } from './types';

type TSuggestion<T> = Suggestion<T>;

const EMPTY_SUGGESTIONS: never[] = [];

export function SearchInput<T = unknown>({
    inputRef,
    getSuggestions,
    renderAddon,
    renderEmpty = defaultRenderEmpty,
    renderSuggestion = defaultRenderSuggestion,
    renderSuggestions = defaultRenderSuggestions,
    query,
    onClear,
    onKeyDown,
    onSelect,
    ...attributes
}: SearchInput.Props<T>) {
    const rootRef = useRef<HTMLInputElement | null>(null);
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

    const handleClose = useFunction(() => setOpen(false));
    const handleSelect = useFunction(onSelect);

    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
    const [activeSuggestion, handleNavigationKeyDown] = useKeyboardNavigation(
        suggestions,
        handleSelect,
        isNotDisabled,
    );

    async function search(query: string) {
        if (latest.current.state.loading[query]) {
            return;
        }

        setOpen(true);

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

    useRootClose(rootRef, () => setOpen(false));

    return (
        <Input
            ref={inputRef ? mergeRefs(inputRef, rootRef) : rootRef}
            {...attributes}
            addon={renderAddon?.()}
            onClear={onClear}
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
                    ? renderEmpty({ loading, query, onClose: handleClose })
                    : renderSuggestions({
                          activeElement: activeElement ?? undefined,
                          activeSuggestion,
                          loading,
                          query,
                          suggestions,
                          onClose: handleClose,
                          onSelect,
                          children: suggestions.map((suggestion) =>
                              renderSuggestion({
                                  suggestion,
                                  ref:
                                      suggestion.id === activeSuggestion?.id
                                          ? setActiveElement
                                          : null,
                                  query,
                                  active: suggestion.id === activeSuggestion?.id,
                                  disabled: Boolean(suggestion.disabled),
                                  onClose: handleClose,
                                  onSelect: () => handleSelect(suggestion),
                              }),
                          ),
                      }))}
        </Input>
    );
}

export namespace SearchInput {
    export type Suggestion<T> = TSuggestion<T>;

    export interface Props<T> extends Omit<BaseProps, 'loading' | 'value' | 'onSelect'> {
        inputRef?: Ref<HTMLInputElement>;
        getSuggestions: (query: string) => Suggestion<T>[] | Promise<Suggestion<T>[]>;
        onClear?: () => void;
        renderAddon?: () => ReactNode;
        renderEmpty?: (props: Props.Empty) => ReactElement | null;
        renderSuggestion?: (props: Props.Option<T>) => ReactElement | null;
        renderSuggestions?: (props: Props.Suggestions<T>) => ReactElement | null;
        query: string;
        onSelect: (suggestion: Suggestion<T>) => void;
    }

    export namespace Props {
        export interface Empty {
            query: string;
            loading: boolean;
            onClose: () => void;
        }
        export interface Option<T> {
            ref: Ref<HTMLElement>;
            active: boolean;
            disabled: boolean;
            query: string;
            suggestion: Suggestion<T>;
            onClose: () => void;
            onSelect: () => void;
        }
        export interface Suggestions<T> {
            children?: ReactNode;
            activeElement: HTMLElement | undefined;
            activeSuggestion: Suggestion<T> | undefined;
            loading: boolean;
            query: string;
            suggestions: Suggestion<T>[];
            onClose: () => void;
            onSelect: (suggestion: Suggestion<T>) => void;
        }
    }

    export const Empty = EmptyModule.Empty;
    export const Option = OptionsModule.Option;
    export const Panel = PanelModule.Panel;
    export const Suggestions = SuggestionsModule.Suggestions;
}

function defaultRenderEmpty({ loading, query }: SearchInput.Props.Empty) {
    return <SearchInput.Empty loading={loading} query={query} />;
}

function defaultRenderSuggestion<T>({
    ref,
    suggestion,
    active,
    disabled,
    onSelect,
}: SearchInput.Props.Option<T>) {
    return (
        <SearchInput.Option
            forwardRef={ref}
            key={suggestion.id}
            active={active}
            disabled={disabled}
            onClick={onSelect}
        >
            {typeof suggestion.value === 'string'
                ? suggestion.value
                : JSON.stringify(suggestion.value)}
        </SearchInput.Option>
    );
}

function defaultRenderSuggestions<T>({
    activeElement,
    query,
    suggestions,
    children,
}: SearchInput.Props.Suggestions<T>) {
    return (
        <SearchInput.Suggestions<T>
            activeElement={activeElement}
            query={query}
            suggestions={suggestions}
        >
            {children}
        </SearchInput.Suggestions>
    );
}

function isNotDisabled<T>(suggestion: Suggestion<T>) {
    return !suggestion.disabled;
}
