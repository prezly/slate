import type { Option } from '../types';

interface Group<T> {
    group: string;
    options: T[];
}

export function groupOptions<Action>(options: Option<Action>[]): Group<Option<Action>>[] {
    const groups = collectGroups(options);
    return groups.map(function (group): Group<Option<Action>> {
        return {
            group,
            options: options.filter((option) => option.group === group),
        };
    });
}

function collectGroups<Action>(options: Option<Action>[]): string[] {
    const groups: string[] = [];

    options.forEach(function (option) {
        if (!groups.includes(option.group)) {
            groups.push(option.group);
        }
    });

    return groups;
}
