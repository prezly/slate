import { Editor, Element, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function liftNode(editor: Editor, [node, path]: NodeEntry) {
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
    } else {
        Transforms.liftNodes(editor, { at: path, voids: true });
    }

    return true;
}
