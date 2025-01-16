import type { Element, SlateEditor } from '@udecode/plate';

enum Direction {
    // Note: The enum values are used as index offsets. Watch out when you decide to modify them.
    ABOVE = 0,
    BELOW = 1,
}

export function insertBlockAbove(editor: SlateEditor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, Direction.ABOVE);
}

export function insertBlockBelow(editor: SlateEditor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, Direction.BELOW);
}

function insertBlock(
    editor: SlateEditor,
    createElement: () => Element,
    direction: Direction,
): boolean {
    const path = editor.selection?.focus.path ?? [];

    if (path.length === 0) return false;

    const [index] = path;

    editor.tf.insertNodes(createElement(), { at: [index + direction] });
    editor.tf.select([index + direction]);

    return true;
}
