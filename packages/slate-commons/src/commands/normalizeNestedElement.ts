import { ElementNode, isElementNode } from '@prezly/slate-types';
import { Editor, Element, ElementEntry, Transforms } from 'slate';

import makeDirty from './makeDirty';

export function normalizeNestedElement(
    editor: Editor,
    [element, path]: ElementEntry,
    isParentAllowed: (element: Element) => boolean,
): boolean {
    const ancestor = Editor.above(editor, { at: path });
    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (isParentAllowed(ancestorNode)) {
        return false;
    }

    makeDirty(editor, path);

    if (
        Editor.isInline(editor, element) ||
        Editor.isVoid(editor, element) ||
        isElementNode(ancestorNode, (element as ElementNode).type)
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
