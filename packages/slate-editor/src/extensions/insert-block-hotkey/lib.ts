import { type Editor, type Element, Transforms } from 'slate';

enum Direction {
    // Note: The enum values are used as index offsets. Watch out when you decide to modify them.
    ABOVE = 0,
    BELOW = 1,
}

export function insertBlockAbove(editor: Editor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, Direction.ABOVE);
}

export function insertBlockBelow(editor: Editor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, Direction.BELOW);
}

function insertBlock(editor: Editor, createElement: () => Element, direction: Direction): boolean {
    const path = editor.selection?.focus.path ?? [];

    if (path.length === 0) return false;

    const [index] = path;

    Transforms.insertNodes(editor, createElement(), { at: [index + direction] });
    Transforms.select(editor, [index + direction]);

    return true;
}
