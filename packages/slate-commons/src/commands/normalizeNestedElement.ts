import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import { isInline, isVoid, type SlateEditor } from '@udecode/plate-common';
import type { ElementEntry } from 'slate';
import { Element } from 'slate';

import { makeDirty } from './makeDirty';

export function normalizeNestedElement(
    editor: SlateEditor,
    [element, path]: ElementEntry,
    isParentAllowed: (element: Element) => boolean,
): boolean {
    const ancestor = editor.above({ at: path });
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
        isInline(editor, element) ||
        isVoid(editor, element) ||
        isElementNode(ancestorNode, (element as ElementNode).type)
    ) {
        if (ancestorNode.children.length === 1) {
            editor.unwrapNodes({ at: ancestorPath, voids: true });
        } else {
            editor.liftNodes({ at: path, voids: true });
        }
    } else {
        editor.unwrapNodes({ at: path });
    }

    return true;
}
