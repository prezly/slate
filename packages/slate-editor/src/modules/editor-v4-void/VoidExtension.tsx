import { isHotkey } from 'is-hotkey';
import { Editor } from 'slate';
import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { VOID_EXTENSION_ID } from './constants';

export const VoidExtension = (): Extension => ({
    id: VOID_EXTENSION_ID,
    onKeyDown: (event, editor) => {
        const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) ?? [];

        if (!currentNode || !editor.selection) {
            return;
        }

        if (!Editor.isVoid(editor, currentNode)) {
            return;
        }

        event.preventDefault();

        if (isHotkey('up')(event)) {
            EditorCommands.moveCursorToPreviousBlock(editor);
        } else if (isHotkey('down')(event)) {
            EditorCommands.moveCursorToNextBlock(editor);
        } else if (isHotkey('enter')(event)) {
            EditorCommands.insertEmptyParagraph(editor);
        }
    },
});
