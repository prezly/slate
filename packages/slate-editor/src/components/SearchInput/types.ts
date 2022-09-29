import type { ReactNode, Ref } from 'react';

export interface Suggestion<T> {
    id: string;
    value: T;
    disabled?: boolean;
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
