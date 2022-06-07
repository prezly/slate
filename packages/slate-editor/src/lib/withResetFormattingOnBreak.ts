import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Node } from 'slate';

export function withResetFormattingOnBreak(match: (node: Node) => boolean) {
    return function <T extends Editor>(editor: T): T {
        const { insertBreak } = editor;

        editor.insertBreak = () => {
            /**
             * The `currentNode` is the top-level block, which means when the
             * cursor is at a list item, the type is bulleted or numbered list.
             * This is why we have to perform `isList` check and not `isListItem`.
             */
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
