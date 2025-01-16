import { isElement, removeNodes } from '@udecode/plate-common';

import type { HierarchyNormalizer } from '../types';

export function removeWhenNoChildren(): HierarchyNormalizer {
    return (editor, node, path) => {
        if (isElement(node) && node.children.length === 0) {
            removeNodes(editor, { at: path, match: (n) => n === node });
            return true;
        }

        return false;
    };
}
