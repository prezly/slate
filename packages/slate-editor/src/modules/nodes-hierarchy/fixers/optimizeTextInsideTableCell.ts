import { EditorCommands } from '@prezly/slate-commons';
import type { NodeEntry, Editor } from 'slate';
import { Text } from 'slate';

export function optimizeTextInsideTableCell(editor: Editor, [node]: NodeEntry) {
    if (Text.isText(node)) {
        return EditorCommands.unsetMark(editor, node, 'bold');
    }

    return false;
}
