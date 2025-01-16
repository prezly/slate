import { PathApi, type NodeEntry, type SlateEditor } from '@udecode/plate';
import * as uuid from 'uuid';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function fixDuplicateButtonBlockUuid(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (ButtonBlockNode.isButtonBlockNode(node)) {
        const [dupe] = editor.api.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                ButtonBlockNode.isButtonBlockNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !PathApi.equals(path, anotherPath),
        });

        if (dupe) {
            editor.tf.setNodes<ButtonBlockNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
