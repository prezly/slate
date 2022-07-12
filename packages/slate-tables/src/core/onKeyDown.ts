import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Transforms } from 'slate';

import type { TablesEditor } from '../TablesEditor';

import { Traverse } from './Traverse';

export function onKeyDown(event: KeyboardEvent<Element>, editor: TablesEditor) {
    if (!editor.selection) {
        return;
    }

    if (isHotkey('up', event)) {
        const traverse = Traverse.create(editor, editor.selection);

        if (!traverse) {
            return;
        }

        const { cellAbove } = traverse.activeCell;

        if (cellAbove) {
            const point = EditorCommands.findLeafPoint(
                editor,
                {
                    path: cellAbove.path,
                    offset: editor.selection.anchor.offset,
                },
                'lowest',
            );

            if (point) {
                Transforms.select(editor, point);
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }

    if (isHotkey('down', event)) {
        const traverse = Traverse.create(editor, editor.selection);

        if (!traverse) {
            return;
        }

        const { cellBelow } = traverse.activeCell;

        if (cellBelow) {
            const point = EditorCommands.findLeafPoint(
                editor,
                {
                    path: cellBelow.path,
                    offset: editor.selection.anchor.offset,
                },
                'highest',
            );

            if (point) {
                Transforms.select(editor, point);
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }
}
