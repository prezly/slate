import { PathApi, type NodeEntry, type SlateEditor } from '@udecode/plate';
import * as uuid from 'uuid';

import { PlaceholderNode } from '../PlaceholderNode';

export function fixDuplicatePlaceholderUuid(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (PlaceholderNode.isPlaceholderNode(node)) {
        const [dupe] = editor.api.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                PlaceholderNode.isPlaceholderNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !PathApi.equals(path, anotherPath),
        });

        if (dupe) {
            editor.tf.setNodes<PlaceholderNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
