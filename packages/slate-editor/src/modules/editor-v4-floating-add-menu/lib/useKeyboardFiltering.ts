import { useMemo } from 'react';

interface Option {
    text: string;
}

export function useKeyboardFiltering<T extends Option>(query: string, options: T[]): T[] {
    return useMemo(
        () =>
            query
                ? options.filter(({ text }) => text.toLowerCase().includes(query.toLowerCase()))
                : options,
        [query, ...options],
    );
}
