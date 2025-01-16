import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import { type Element, ElementApi, type ElementEntry, type SlateEditor } from '@udecode/plate';

import { makeDirty } from './makeDirty';

export function normalizeNestedElement(
    editor: SlateEditor,
    [element, path]: ElementEntry,
    isParentAllowed: (element: Element) => boolean,
): boolean {
    const ancestor = editor.api.above({ at: path });
    if (!ancestor) {
        return false;
    }

    const [ancestorNode, ancestorPath] = ancestor;

    if (!ElementApi.isElement(ancestorNode)) {
        return false;
    }

    if (isParentAllowed(ancestorNode)) {
        return false;
    }

    makeDirty(editor, path);

    if (
        editor.api.isInline(element) ||
        editor.api.isVoid(element) ||
        isElementNode(ancestorNode, (element as ElementNode).type)
    ) {
        if (ancestorNode.children.length === 1) {
            editor.tf.unwrapNodes({ at: ancestorPath, voids: true });
        } else {
            editor.tf.liftNodes({ at: path, voids: true });
        }
    } else {
        editor.tf.unwrapNodes({ at: path });
    }

    return true;
}
