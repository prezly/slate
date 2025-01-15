import { ElementApi } from '@udecode/plate';

import type { HierarchyNormalizer } from '../types';

export function removeWhenNoChildren(): HierarchyNormalizer {
    return (editor, node, path) => {
        if (ElementApi.isElement(node) && node.children.length === 0) {
            editor.tf.removeNodes({ at: path, match: (n) => n === node });
            return true;
        }

        return false;
    };
}
