import type { Editor } from 'slate';
import { Element } from 'slate';

import type { NodesHierarchySchema } from './types';

export function withNodesHierarchy(schema: NodesHierarchySchema) {
    return <T extends Editor>(editor: T): T => {
        const { normalizeNode } = editor;

        editor.normalizeNode = (entry) => {
            const [node, path] = entry;

            if (!Element.isElement(node)) {
                return normalizeNode(entry);
            }

            for (const normalizer of schema[node.type] ?? []) {
                const isNormalized = normalizer(editor, [node, path]);

                if (isNormalized) {
                    return;
                }
            }

            normalizeNode(entry);
        };

        return editor;
    };
}
