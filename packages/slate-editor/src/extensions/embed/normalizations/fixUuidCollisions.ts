import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';
import { Path } from 'slate';
import * as uuid from 'uuid';

import { EmbedNode } from '../EmbedNode';

export function fixUuidCollisions(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (EmbedNode.isEmbedNode(node)) {
        const [dupe] = editor.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                EmbedNode.isEmbedNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            editor.setNodes<EmbedNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
