import { type Editor, type Element, Transforms } from 'slate';

export function insertBlockAbove(editor: Editor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, 0);
}

export function insertBlockBelow(editor: Editor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, +1);
}

function insertBlock(editor: Editor, createElement: () => Element, offset: number): boolean {
    const path = editor.selection?.focus.path ?? [];

    if (path.length === 0) return false;

    const [index] = path;

    Transforms.insertNodes(editor, createElement(), { at: [index + offset] });
    Transforms.select(editor, [index + offset]);

    return true;
}
