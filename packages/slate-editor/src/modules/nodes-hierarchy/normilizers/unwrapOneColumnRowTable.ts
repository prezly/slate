import { isTableNode } from '@prezly/slate-types';
import { Transforms } from 'slate';
import { Node } from 'slate';

import { isDescendantOf } from '../queries';
import type { HierarchyNormalizer } from '../types';

export function unwrapOneColumnRowTable(): HierarchyNormalizer {
    const isDescendantOfTable = isDescendantOf(isTableNode);

    return (editor, path) => {
        const node = Node.get(editor, path);

        if (!isTableNode(node)) {
            return false;
        }

        if (node.children.length <= 1 && node.children[0].children.length <= 1) {
            if (isDescendantOfTable(node, path, editor)) {
                Transforms.unwrapNodes(editor, { at: path });
                return true;
            }
        }

        return false;
    };
}
