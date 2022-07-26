import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function mustHaveChildren(fix: HierarchyFixer): HierarchyNormalizer {
    return (editor, path) => {
        const node = Node.get(editor, path);

        if ('children' in node && node.children.length === 0) {
            const at = [...path, 0];
            return fix(editor, [node, at]);
        }

        return false;
    };
}
