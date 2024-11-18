import type { SlateEditor, TNode } from '@udecode/plate-common';
import { Text } from 'slate';
import { Editor } from 'slate';

import { EDITOR_NODE_TYPE, TEXT_NODE_TYPE } from './types';
import type { NodesHierarchySchema, HierarchyNormalizer } from './types';

export function withNodesHierarchy(schema: NodesHierarchySchema) {
    return <T extends SlateEditor>(editor: T): T => {
        const { normalizeNode } = editor;

        editor.normalizeNode = (entry) => {
            const [node, path] = entry;
            const normalizers = getSchemaNormalizers(node, schema);

            for (const normalizer of normalizers) {
                // @ts-expect-error TODO: Fix this
                const isNormalized = normalizer(editor, node, path);

                if (isNormalized) {
                    return;
                }
            }

            normalizeNode(entry);
        };

        return editor;
    };
}

function getSchemaNormalizers(node: TNode, schema: NodesHierarchySchema) {
    let res: HierarchyNormalizer[] | undefined = undefined;

    if (Text.isText(node)) {
        res = schema[TEXT_NODE_TYPE];
    } else if (Editor.isEditor(node)) {
        res = schema[EDITOR_NODE_TYPE];
    } else if ('type' in node) {
        // @ts-expect-error TODO: Fix this
        res = schema[node.type];
    }

    return res ?? [];
}
