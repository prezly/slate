import { type Editor, type Element, Transforms } from 'slate';

export function insertBlockAbove(editor: Editor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, 0);
}

export function insertBlockBelow(editor: Editor, createElement: () => Element): boolean {
    return insertBlock(editor, createElement, +1);
}

function insertBlock(editor: Editor, createElement: () => Element, offset: number): boolean {
    if (!editor.selection) return false;

    const [index] = editor.selection.focus.path;

    if (!index) return false;

    Transforms.insertNodes(editor, createElement(), { at: [index + offset] });
    Transforms.select(editor, [index + offset]);

    return true;
}
