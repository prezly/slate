import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function isInside(
    parentSelection: HierarchyNodeQuery,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, path) => {
        for (const entry of Node.levels(editor, path)) {
            const [node] = entry;

            if (Node.isNode(node) && parentSelection(entry, editor)) {
                const currentNode = Node.get(editor, path);
                return fix(editor, [currentNode, path]);
            }
        }

        return false;
    };
}
