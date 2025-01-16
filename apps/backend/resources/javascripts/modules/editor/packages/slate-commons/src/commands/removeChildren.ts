import { isElement, isText, type SlateEditor, type TNodeEntry } from '@udecode/plate-common';

/**
 * Ensures given element has a single, empty `Text` child.
 * Returns `true` when removal occurred.
 * Returns `false` when nothing changed.
 */
export function removeChildren(editor: SlateEditor, [node, path]: TNodeEntry): boolean {
    if (!isElement(node)) {
        return false;
    }

    const [child] = node.children;

    if (node.children.length === 1 && isText(child) && child.text.length === 0) {
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
