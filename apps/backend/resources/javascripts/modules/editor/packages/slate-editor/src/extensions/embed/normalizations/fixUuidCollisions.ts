import { PathApi, type NodeEntry, type SlateEditor } from '@udecode/plate';
import * as uuid from 'uuid';

import { EmbedNode } from '../EmbedNode';

export function fixUuidCollisions(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (EmbedNode.isEmbedNode(node)) {
        const [dupe] = editor.api.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                EmbedNode.isEmbedNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !PathApi.equals(path, anotherPath),
        });

        if (dupe) {
            editor.tf.setNodes<EmbedNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
