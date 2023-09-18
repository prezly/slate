import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Node } from 'slate';

export function resetFormattingOnBreak(editor: Editor, match: (node: Node) => boolean) {
    const currentNode = EditorCommands.getCurrentNode(editor);

    if (currentNode && match(currentNode) && EditorCommands.isSelectionAtBlockEnd(editor)) {
        EditorCommands.insertEmptyParagraph(editor);
        return true; // handled
    }

    return false;
}
