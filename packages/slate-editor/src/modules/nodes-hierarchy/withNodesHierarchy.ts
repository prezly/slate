import type { Node } from 'slate';
import { Editor } from 'slate';

import { EditorRootNode } from './types';
import type { NodesHierarchySchema } from './types';

export function withNodesHierarchy(schema: NodesHierarchySchema) {
    return <T extends Editor>(editor: T): T => {
        const { normalizeNode } = editor;

        editor.normalizeNode = (entry) => {
            const [node, path] = entry;
            const normalizers = getSchemaNormalizers(node, schema);

            for (const normalizer of normalizers) {
                const isNormalized = normalizer(editor, path);

                if (isNormalized) {
                    return;
                }
            }

            normalizeNode(entry);
        };

        return editor;
    };
}

function getSchemaNormalizers(node: Node, schema: NodesHierarchySchema) {
    if (Editor.isEditor(node)) {
        return schema[EditorRootNode];
    }

    if ('type' in node) {
        return schema[node.type] ?? [];
    }

    return [];
}
