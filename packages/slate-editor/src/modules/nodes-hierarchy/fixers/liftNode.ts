import { Editor, Element, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function liftNode(editor: Editor, [, path]: NodeEntry) {
    const ancestor = Editor.above(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    Transforms.liftNodes(editor, { at: path, voids: true });

    return true;
}
