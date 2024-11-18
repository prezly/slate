import type { SlateEditor } from '@udecode/plate-common';
import { Element } from 'slate';
import type { NodeEntry } from 'slate';

export function unwrapSameTypeChild(editor: SlateEditor, [node, path]: NodeEntry) {
    const ancestor = editor.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if ('type' in node && node.type == ancestorNode.type && ancestorNode.children.length === 1) {
        editor.unwrapNodes({ at: ancestorPath, voids: true });
        return true;
    }

    return false;
}
