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

            const schemaEntry = schema[node.type];

            if (!schemaEntry) {
                return normalizeNode(entry);
            }

            const [normalizers, fallback] = schemaEntry;

            const hasSomeNormalizerApplied = normalizers.some((normalizer) => {
                const isNormalized = normalizer(editor, [node, path]);

                if (!isNormalized) {
                    return fallback?.(editor, [node, path]);
                }

                return isNormalized;
            });

            if (!hasSomeNormalizerApplied) {
                return normalizeNode(entry);
            }
        };

        return editor;
    };
}
