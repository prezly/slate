import { Editor, Element, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function unwrapNode(editor: Editor, [, path]: NodeEntry) {
    const ancestor = Editor.above(editor, { at: path });
    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    Transforms.unwrapNodes(editor, { at: path });

    return true;
}
