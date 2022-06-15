import { ComposedElement } from '@prezly/content-format';
import { Editor, Element, Transforms } from 'slate';
import type { Node, Path } from 'slate';

export function squashNestedElement(editor: Editor, node: Node, path: Path) {
    const ancestor = Editor.above(editor, { at: path });
    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (
        ('type' in node && ComposedElement.isComposedElement(ancestorNode, node.type)) ||
        Editor.isInline(editor, node) ||
        Editor.isVoid(editor, node)
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
