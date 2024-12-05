import { isEditor, isElement } from '@udecode/plate-common';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function mustHaveChildren(fix: HierarchyFixer): HierarchyNormalizer {
    return (editor, node, path) => {
        if ((isEditor(node) || isElement(node)) && node.children.length === 0) {
            const at = [...path, 0];
            return fix(editor, [node, at]);
        }

        return false;
    };
}
