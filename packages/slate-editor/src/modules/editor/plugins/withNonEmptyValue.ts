/* eslint-disable no-param-reassign */

import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function withNonEmptyValue<T extends Editor>(editor: T) {
    const { normalizeNode } = editor;

    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0 && editor.children.length === 0) {
            EditorCommands.insertEmptyParagraph(editor, { at: [0] });
            Transforms.select(editor, [0, 0]);
            return;
        }

        normalizeNode([node, path]);
    };

    return editor;
}
