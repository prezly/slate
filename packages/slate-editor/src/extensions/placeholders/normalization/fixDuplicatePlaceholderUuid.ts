import type { NodeEntry } from 'slate';
import { Editor, Path, Transforms } from 'slate';
import * as uuid from 'uuid';

import { PlaceholderNode } from '../PlaceholderNode';

export function fixDuplicatePlaceholderUuid(editor: Editor, [node, path]: NodeEntry): boolean {
    if (PlaceholderNode.isPlaceholderNode(node)) {
        const [dupe] = Editor.nodes(editor, {
            at: [],
            match: (anotherNode, anotherPath) =>
                PlaceholderNode.isPlaceholderNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            Transforms.setNodes<PlaceholderNode>(editor, { uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
