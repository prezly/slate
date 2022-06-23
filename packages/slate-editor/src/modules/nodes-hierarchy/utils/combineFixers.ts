import type { HierarchyFixer } from '../types';

export function combineFixers(fixers: HierarchyFixer[]): HierarchyFixer {
    return (editor, entry) => {
        for (const fix of fixers) {
            const isFixed = fix(editor, entry);

            if (isFixed) {
                return true;
            }
        }

        return false;
    };
}
