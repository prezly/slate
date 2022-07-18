import { Editor } from 'slate';

import type { HierarchyNodeQuery } from '../types';

export function isDescendantOf(parentMatch: HierarchyNodeQuery): HierarchyNodeQuery {
    return (node, path, editor) => {
        const levels = Editor.levels(editor, {
            at: path,
            match: (n) => n !== node,
        });

        for (const [parentNode, parentPath] of levels) {
            if (parentMatch(parentNode, parentPath, editor)) {
                return true;
            }
        }

        return false;
    };
}
