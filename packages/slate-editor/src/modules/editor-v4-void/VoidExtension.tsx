import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import { Editor, Transforms } from 'slate';

import { createParagraph } from '#modules/editor-v4-paragraphs';

import { VOID_EXTENSION_ID } from './constants';

import { isDeleting } from '#modules/editor-v4-image/lib';

export function VoidExtension(): Extension {
    return {
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
            } else if (isDeleting(event)) {
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
