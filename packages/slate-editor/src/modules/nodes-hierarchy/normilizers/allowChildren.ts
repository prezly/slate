import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function allowChildren(
    isAllowed: HierarchyNodeQuery,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, path) => {
        const node = Node.get(editor, path);

        if ('children' in node) {
            for (const [childNode, childPath] of Node.children(editor, path)) {
                if (!isAllowed(childNode, childPath, editor)) {
                    return fix(editor, [childNode, childPath]);
                }
            }
        }

        return false;
    };
}
