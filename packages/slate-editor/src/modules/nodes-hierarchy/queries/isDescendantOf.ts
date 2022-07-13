import { Editor } from 'slate';

import type { HierarchyNodeQuery } from '../types';

export function isDescendantOf(parentMatch: HierarchyNodeQuery): HierarchyNodeQuery {
    return (node, path, editor) => {
        for (const [parentNode, parentPath] of Editor.levels(editor, {
            at: path,
            match: (n) => n !== node,
        })) {
            if (parentMatch(parentNode, parentPath, editor)) {
                return true;
            }
        }

        return false;
    };
}
