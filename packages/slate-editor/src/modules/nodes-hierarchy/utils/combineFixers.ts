import type { HierarchyFixer } from '../types';

export function combineFixers(fixers: HierarchyFixer[]): HierarchyFixer {
    return (node, path) => {
        for (const fix of fixers) {
            const isFixed = fix(node, path);

            if (isFixed) {
                return true;
            }
        }

        return false;
    };
}
