import type { Node } from 'slate';
import { Editor } from 'slate';

import { EditorRootNode } from './types';
import type { NodesHierarchySchema, HierarchyNormalizer } from './types';

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
    let res: HierarchyNormalizer[] | undefined = undefined;

    if (Editor.isEditor(node)) {
        res = schema[EditorRootNode];
    } else if ('type' in node) {
        res = schema[node.type];
    }

    return res ?? [];
}
