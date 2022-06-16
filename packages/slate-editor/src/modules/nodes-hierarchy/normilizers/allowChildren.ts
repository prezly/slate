import type { Editor, NodeEntry } from 'slate';
import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function allowChildren(
    isAllowed: (entry: NodeEntry, editor: Editor) => boolean,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, path) => {
        for (const entry of Node.children(editor, path)) {
            if (!isAllowed(entry, editor)) {
                return fix(editor, entry);
            }
        }

        return false;
    };
}
