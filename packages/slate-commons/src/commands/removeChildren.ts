import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';
import { Element, Text } from 'slate';

/**
 * Ensures given element has a single, empty `Text` child.
 * Returns `true` when removal occurred.
 * Returns `false` when nothing changed.
 */
export function removeChildren(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!Element.isElement(node)) {
        return false;
    }

    const [child] = node.children;

    if (node.children.length === 1 && Text.isText(child) && child.text.length === 0) {
        return false;
    }

    editor.withoutNormalizing(() => {
        editor.insertNodes([{ text: '' }], { at: [...path, 0] });

        node.children.forEach(() => {
            editor.removeNodes({
                at: [...path, 1],
                voids: true,
            });
        });
    });

    return true;
}
