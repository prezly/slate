import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function isInside(
    parentSelection: HierarchyNodeQuery,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, path) => {
        for (const [parentNode] of Node.levels(editor, path)) {
            if (parentSelection(parentNode, editor)) {
                const currentNode = Node.get(editor, path);
                return fix(editor, [currentNode, path]);
            }
        }

        return false;
    };
}
