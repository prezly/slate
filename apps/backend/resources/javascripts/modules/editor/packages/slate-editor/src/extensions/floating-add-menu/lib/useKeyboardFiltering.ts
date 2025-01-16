import { useMemo } from 'react';

import { MENU_TRIGGER_CHARACTER } from './isMenuHotkey';

interface Option {
    group: string;
    text: string;
    keywords?: string[];
    description?: string;
}

const LEADING_MENU_TRIGGER_CHARACTERS = new RegExp(`^[${MENU_TRIGGER_CHARACTER}]+`);

export function useKeyboardFiltering<T extends Option>(input: string, options: T[]): [string, T[]] {
    const query = (
        input.startsWith(MENU_TRIGGER_CHARACTER)
            ? input.replace(LEADING_MENU_TRIGGER_CHARACTERS, '')
            : input
    ).toLowerCase();

    const filteredOptions = useMemo(
        function () {
            return query ? filter(options, query) : options;
        },
        [query, ...options],
    );

    return [query, filteredOptions];
}

function filter<T extends Option>(options: T[], query: string): T[] {
    if (!query) return options;

    const lowercaseQuery = query.toLowerCase().trimStart();

    const relevanceOrderedOptions = [
        ...options.filter(({ text }) => ` ${text.toLowerCase()}`.includes(` ${lowercaseQuery}`)),
        ...options.filter(({ text }) => text.toLowerCase().includes(lowercaseQuery)),
        ...options.filter(({ description }) => description?.toLowerCase().includes(lowercaseQuery)),
        ...options.filter(({ keywords }) =>
            keywords ? keywords.some((keyword) => keyword.includes(lowercaseQuery)) : false,
        ),
    ];

    return keepGroups(deduplicate(relevanceOrderedOptions));
}

function deduplicate<T>(items: T[]): T[] {
    return items.filter((item, index, self) => self.indexOf(item) === index);
}

function keepGroups<T extends Option>(options: T[]): T[] {
    const groups = deduplicate(options.map((option) => option.group));

    return groups.flatMap((group) => options.filter((option) => option.group === group));
}
