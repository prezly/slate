import type { NodeEntry } from 'slate';
import { Editor, Path, Transforms } from 'slate';
import * as uuid from 'uuid';

import { EmbedNode } from '../EmbedNode';

export function fixUuidCollisions(editor: Editor, [node, path]: NodeEntry): boolean {
    if (EmbedNode.isEmbedNode(node)) {
        const [dupe] = Editor.nodes(editor, {
            at: [],
            match: (anotherNode, anotherPath) =>
                EmbedNode.isEmbedNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            Transforms.setNodes<EmbedNode>(editor, { uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
