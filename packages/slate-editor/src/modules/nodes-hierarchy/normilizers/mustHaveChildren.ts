import { ElementApi, NodeApi } from '@udecode/plate';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function mustHaveChildren(fix: HierarchyFixer): HierarchyNormalizer {
    return (editor, node, path) => {
        if ((NodeApi.isEditor(node) || ElementApi.isElement(node)) && node.children.length === 0) {
            const at = [...path, 0];
            return fix(editor, [node, at]);
        }

        return false;
    };
}
