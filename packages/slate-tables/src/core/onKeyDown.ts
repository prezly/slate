import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { BasePoint } from 'slate';
import { Editor, Path } from 'slate';
import { Transforms } from 'slate';

import type { TablesEditor } from '../TablesEditor';

import { Traverse } from './Traverse';

export function onKeyDown(event: KeyboardEvent<Element>, editor: TablesEditor) {
    if (!editor.selection) {
        return;
    }

    let locationToSelect: BasePoint | undefined | null = null;

    if (isHotkey('up', event)) {
        locationToSelect = getPointOnUpPress(editor);
    }

    if (isHotkey('down', event)) {
        locationToSelect = getPointOnDownPress(editor);
    }

    if (locationToSelect) {
        Transforms.select(editor, locationToSelect);
        Transforms.collapse(editor);
        event.stopPropagation();
        event.preventDefault();
    }
}

function getPointOnUpPress(editor: TablesEditor) {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    if (activeCell.row.isFirst) {
        return Editor.before(editor, matrix.path, { unit: 'block' });
    }

    const [, firstNodePath] = Editor.first(editor, activeCell.path);

    if (!Path.equals(editor.selection.anchor.path, firstNodePath)) {
        return undefined;
    }

    const { cellAbove } = activeCell;

    if (cellAbove) {
        return EditorCommands.findLeafPoint(
            editor,
            {
                path: cellAbove.path,
                offset: editor.selection.anchor.offset,
            },
            'lowest',
        );
    }

    return undefined;
}

function getPointOnDownPress(editor: TablesEditor) {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    if (activeCell.row.isLast) {
        return Editor.after(editor, matrix.path, { unit: 'block' });
    }

    const [, lastNodePath] = Editor.last(editor, activeCell.path);

    if (!Path.equals(editor.selection.anchor.path, lastNodePath)) {
        return undefined;
    }

    const { cellBelow } = activeCell;

    if (cellBelow) {
        return EditorCommands.findLeafPoint(
            editor,
            {
                path: cellBelow.path,
                offset: editor.selection.anchor.offset,
            },
            'highest',
        );
    }

    return undefined;
}
