import type { Option } from '../types';

export function prependSuggestions<T>(options: Option<T>[], groupLabel: string): Option<T>[] {
    const suggestions = options
        .filter(({ suggested }) => typeof suggested === 'number')
        .map((option) => ({ ...option, group: groupLabel }))
        .sort(({ suggested: x }, { suggested: y }) => Number(x) - Number(y));

    return [...suggestions, ...options];
}
