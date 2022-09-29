import type { ReactNode } from 'react';

export interface Suggestion<T> {
    id: string;
    value: T;
    disabled?: boolean;
}

export namespace Props {
    export interface Empty {
        query: string;
        loading: boolean;
    }
    export interface Option<T> {
        children?: ReactNode;
        active: boolean;
        disabled: boolean;
        suggestion: Suggestion<T>;
        onSelect: () => void;
    }
    export interface Suggestions<T> {
        children?: ReactNode;
        active: Suggestion<T> | undefined;
        loading: boolean;
        query: string;
        suggestions: Suggestion<T>[];
        onSelect: (suggestion: Suggestion<T>) => void;
    }
}
