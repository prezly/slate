import { isElementNode } from '@prezly/slate-types';
import { Editor, Element, Transforms } from 'slate';
import type { NodeEntry } from 'slate';

export function squashNestedElement(editor: Editor, [node, path]: NodeEntry) {
    const ancestor = Editor.above(editor, { at: path });
    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (
        Editor.isInline(editor, node) ||
        Editor.isVoid(editor, node) ||
        isElementNode(ancestorNode, (node as any).type)
    ) {
        if (ancestorNode.children.length === 1) {
            Transforms.unwrapNodes(editor, { at: ancestorPath, voids: true });
        } else {
            Transforms.liftNodes(editor, { at: path, voids: true });
        }
    } else {
        Transforms.unwrapNodes(editor, { at: path });
    }

    return true;
}
