import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import { Editor } from 'slate';

import { VOID_EXTENSION_ID } from './constants';

export const VoidExtension = (): Extension => ({
    id: VOID_EXTENSION_ID,
    onKeyDown: (event, editor) => {
        const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) ?? [];

        if (!currentNode || !editor.selection || !Editor.isVoid(editor, currentNode)) {
            return;
        }

        let hasBeenHandled = false;

        if (isHotkey('up', event)) {
            hasBeenHandled = true;
            EditorCommands.moveCursorToPreviousBlock(editor);
        } else if (isHotkey('down', event)) {
            hasBeenHandled = true;
            EditorCommands.moveCursorToNextBlock(editor);
        } else if (isHotkey('enter', event)) {
            hasBeenHandled = true;
            EditorCommands.insertEmptyParagraph(editor);
        }

        if (hasBeenHandled) {
            event.preventDefault();
        }
    },
});
