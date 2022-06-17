import { Editor, Element, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function unwrapSameTypeChild(editor: Editor, [node, path]: NodeEntry) {
    const ancestor = Editor.above(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if ('type' in node && node.type == ancestorNode.type && ancestorNode.children.length === 1) {
        Transforms.unwrapNodes(editor, { at: ancestorPath, voids: true });
        return true;
    }

    return false;
}
