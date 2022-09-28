import type { ReactElement } from 'react';
import React from 'react';

import { Option } from './Option';
import styles from './SearchInput.module.scss';
import type { Suggestion } from './types';

export interface RenderSuggestionProps<T> {
    id: Suggestion<T>['id'];
    value: T;
    active: boolean;
    disabled: boolean;
    loading: boolean;
    query: string;
}

export interface Props<T> {
    active: Suggestion<T> | undefined;
    loading: boolean;
    query: string;
    renderSuggestion: (props: RenderSuggestionProps<T>) => ReactElement;
    suggestions: Suggestion<T>[];
    onSelect: (suggestion: Suggestion<T>) => void;
}

export function Suggestions<T>({
    active,
    loading,
    query,
    renderSuggestion,
    suggestions,
    onSelect,
}: Props<T>) {
    return (
        <ul className={styles.Suggestions}>
            {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                    <Option
                        key={suggestion.id}
                        active={active?.id === suggestion.id}
                        disabled={suggestion.disabled}
                        onClick={() => onSelect(suggestion)}
                    >
                        {renderSuggestion({
                            id: suggestion.id,
                            value: suggestion.value,
                            active: active?.id === suggestion.id,
                            loading,
                            disabled: suggestion.disabled ?? false,
                            query,
                        })}
                    </Option>
                </li>
            ))}
        </ul>
    );
}
