import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import { Editor, Transforms } from 'slate';

import { isDeletingEvent } from '#lib';

import { createParagraph } from '#extensions/paragraphs';

export const EXTENSION_ID = 'VoidExtension';

export function VoidExtension(): Extension {
    return {
        id: EXTENSION_ID,
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
            } else if (isDeletingEvent(event)) {
                Transforms.setNodes(editor, createParagraph(), {
                    match: (node) => node === currentNode,
                });

                hasBeenHandled = true;
            }

            if (hasBeenHandled) {
                event.preventDefault();
            }
        },
    };
}
