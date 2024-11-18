import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';
import { Path } from 'slate';
import * as uuid from 'uuid';

import { PlaceholderNode } from '../PlaceholderNode';

export function fixDuplicatePlaceholderUuid(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (PlaceholderNode.isPlaceholderNode(node)) {
        const [dupe] = editor.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                PlaceholderNode.isPlaceholderNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            editor.setNodes<PlaceholderNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
