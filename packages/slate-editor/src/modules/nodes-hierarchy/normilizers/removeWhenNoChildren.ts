import { Transforms } from 'slate';

import type { HierarchyNormalizer } from '../types';

export function removeWhenNoChildren(): HierarchyNormalizer {
    return (editor, node, path) => {
        if ('children' in node && node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path, match: (n) => n === node });
            return true;
        }

        return false;
    };
}
