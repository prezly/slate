import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';
import { Path } from 'slate';
import * as uuid from 'uuid';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function fixDuplicateButtonBlockUuid(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (ButtonBlockNode.isButtonBlockNode(node)) {
        const [dupe] = editor.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                ButtonBlockNode.isButtonBlockNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            editor.setNodes<ButtonBlockNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
