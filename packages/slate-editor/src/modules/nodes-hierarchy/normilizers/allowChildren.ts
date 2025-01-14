import { getNodeChildren } from '@udecode/plate-common';

import type { HierarchyFixer, HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function allowChildren(
    isAllowed: HierarchyNodeQuery,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, node, path) => {
        if ('children' in node) {
            const children = getNodeChildren(editor, path);
            for (const [childNode, childPath] of children) {
                if (!isAllowed(childNode, childPath, editor)) {
                    return fix(editor, [childNode, childPath]);
                }
            }
        }

        return false;
    };
}
