import type { HierarchyFixer } from '../types';

export function combineFixers(fixers: HierarchyFixer[]): HierarchyFixer {
    return (editor, node, path) => {
        for (const fix of fixers) {
            const isFixed = fix(editor, node, path);

            if (isFixed) {
                return true;
            }
        }

        return false;
    };
}
