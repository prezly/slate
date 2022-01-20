import { useMemo } from 'react';

interface Option {
    text: string;
    description?: string;
}

export function useKeyboardFiltering<T extends Option>(query: string, options: T[]): T[] {
    return useMemo(
        function () {
            if (!query) return options;

            return options.filter(
                ({ text, description = '' }) =>
                    text.toLowerCase().includes(query.toLowerCase()) ||
                    description.toLowerCase().includes(query.toLowerCase()),
            );
        },
        [query, ...options],
    );
}
