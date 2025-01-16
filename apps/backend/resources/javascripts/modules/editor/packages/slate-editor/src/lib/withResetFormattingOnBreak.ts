import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor, TNode } from '@udecode/plate-common';

export function withResetFormattingOnBreak(match: (node: TNode) => boolean) {
    return function <T extends SlateEditor>(editor: T): T {
        const { insertBreak } = editor;

        editor.insertBreak = () => {
            const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

            if (currentNode && match(currentNode) && EditorCommands.isSelectionAtBlockEnd(editor)) {
                EditorCommands.insertEmptyParagraph(editor);
                return;
            }

            insertBreak();
        };

        return editor;
    };
}
