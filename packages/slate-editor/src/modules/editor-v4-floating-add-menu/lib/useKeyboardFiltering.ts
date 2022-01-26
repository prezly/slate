import { useMemo } from 'react';

import { MENU_TRIGGER_CHARACTER } from './isMenuHotkey';

interface Option {
    text: string;
    description?: string;
}

export function useKeyboardFiltering<T extends Option>(input: string, options: T[]): [string, T[]] {
    const query = (input[0] === MENU_TRIGGER_CHARACTER ? input.substring(1) : input).toLowerCase();

    const filteredOptions = useMemo(
        function () {
            if (!query) return options;

            return options.filter(({ text }) => text.toLowerCase().includes(query.toLowerCase()));
        },
        [query, ...options],
    );

    return [query, filteredOptions];
}
