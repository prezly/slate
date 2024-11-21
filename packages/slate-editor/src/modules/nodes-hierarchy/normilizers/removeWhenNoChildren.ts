import { isEditor, isElement } from '@udecode/plate-common';

import type { HierarchyNormalizer } from '../types';

export function removeWhenNoChildren(): HierarchyNormalizer {
    return (editor, node, path) => {
        if ((isEditor(node) || isElement(node)) && node.children.length === 0) {
            editor.removeNodes({ at: path, match: (n) => n === node });
            return true;
        }

        return false;
    };
}
