import { Node } from 'slate';

import type { HierarchyNodeQuery } from '../types';

export function isDescendantOf(parentMatch: HierarchyNodeQuery): HierarchyNodeQuery {
    return (_, path, editor) => {
        for (const [parentNode, parentPath] of Node.levels(editor, path)) {
            if (parentMatch(parentNode, parentPath, editor)) {
                return true;
            }
        }

        return false;
    };
}
