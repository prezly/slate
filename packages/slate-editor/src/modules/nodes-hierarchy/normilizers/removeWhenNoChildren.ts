import { Node, Transforms } from 'slate';

import type { HierarchyNormalizer } from '../types';

export function removeWhenNoChildren(): HierarchyNormalizer {
    return (editor, path) => {
        const node = Node.get(editor, path);

        if ('children' in node && node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path, match: (n) => n === node });
            return true;
        }

        return false;
    };
}
