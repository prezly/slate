import type { NodeEntry } from 'slate';
import { Editor, Path, Transforms } from 'slate';
import * as uuid from 'uuid';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function fixDuplicateButtonBlockUuid(editor: Editor, [node, path]: NodeEntry): boolean {
    if (ButtonBlockNode.isButtonBlockNode(node)) {
        const [dupe] = Editor.nodes(editor, {
            at: [],
            match: (anotherNode, anotherPath) =>
                ButtonBlockNode.isButtonBlockNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            Transforms.setNodes<ButtonBlockNode>(editor, { uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
