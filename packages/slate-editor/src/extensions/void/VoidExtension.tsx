import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import { Transforms } from 'slate';

import { isDeletingEvent } from '#lib';

import { createParagraph } from '#extensions/paragraphs';

export const EXTENSION_ID = 'VoidExtension';

export function VoidExtension(): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown: (event, editor) => {
            const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) ?? [];

            if (!currentNode || !editor.selection || !EditorCommands.isVoid(editor, currentNode)) {
                return false;
            }

            if (isHotkey('up', event)) {
                EditorCommands.moveCursorToPreviousBlock(editor);
                return true;
            } else if (isHotkey('down', event)) {
                EditorCommands.moveCursorToNextBlock(editor);
                return true;
            } else if (isHotkey('enter', event)) {
                EditorCommands.insertEmptyParagraph(editor);
                return true;
            } else if (isDeletingEvent(event)) {
                Transforms.setNodes(editor, createParagraph(), {
                    match: (node) => node === currentNode,
                });
                return true;
            }

            return false;
        },
    };
}
