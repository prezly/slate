import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function allowChildren(
    isAllowed: HierarchyNodeQuery,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, path) => {
        const node = Node.get(editor, path);

        if ('children' in node) {
            for (const entry of Node.children(editor, path)) {
                if (!isAllowed(entry, editor)) {
                    return fix(editor, entry);
                }
            }
        }

        return false;
    };
}
