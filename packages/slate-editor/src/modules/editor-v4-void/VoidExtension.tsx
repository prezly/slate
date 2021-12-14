import { isHotkey } from 'is-hotkey';
import { Editor } from 'slate';
import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { VOID_EXTENSION_ID } from './constants';

export const VoidExtension = (): Extension => ({
    id: VOID_EXTENSION_ID,
    onKeyDown: (event, editor) => {
        const [currentElement] = EditorCommands.getCurrentNodeEntry(editor) ?? [];

        if (!currentElement) {
            return;
        }

        const isVoid = currentElement && Editor.isVoid(editor, currentElement);

        if (!isVoid) {
            return;
        }

        if (isHotkey('up')(event)) {
            event.preventDefault();
            EditorCommands.moveCursorToPreviousBlock(editor);
        } else if (isHotkey('down')(event) || isHotkey('enter')(event)) {
            event.preventDefault();
            EditorCommands.moveCursorToNextBlock(editor);
        }
    },
});
