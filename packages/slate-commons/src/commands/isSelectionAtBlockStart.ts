import { Editor, Range } from 'slate';

export function isSelectionAtBlockStart(editor: Editor): boolean {
    if (!editor.selection) {
        // Cannot determine the location if there is no selection.
        return false;
    }

    const startOfSelection = Range.start(editor.selection);
    const blockAbove = Editor.above(editor, {
        match: (node) => Editor.isBlock(editor, node),
    });

    if (!blockAbove) {
        return false;
    }

    const [, startOfBlock] = blockAbove;

    return Editor.isStart(editor, startOfSelection, startOfBlock);
}
