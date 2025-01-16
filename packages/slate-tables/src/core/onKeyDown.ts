import { EditorCommands } from '@prezly/slate-commons';
import { type Location, type Point } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { TablesEditor } from '../TablesEditor';

import { Traverse } from './Traverse';

export function onKeyDown(event: KeyboardEvent<Element>, editor: TablesEditor) {
    if (!editor.selection) {
        return false;
    }

    let locationToSelect: Location | undefined = undefined;

    if (isHotkey('up', event)) {
        locationToSelect = onUpPress(editor);
    }

    if (isHotkey('down', event)) {
        locationToSelect = onDownPress(editor);
    }

    if (isHotkey('tab', event)) {
        locationToSelect = onTabPress(editor);
    }

    if (locationToSelect) {
        editor.tf.select(locationToSelect);
        return true;
    }

    return false;
}

function onUpPress(editor: TablesEditor): Point | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    const cellStart = editor.api.start(activeCell.path);

    const isCursorOnFirstLine = EditorCommands.isCursorOnFirstLine(
        editor,
        cellStart,
        editor.selection.anchor,
    );

    if (isCursorOnFirstLine) {
        if (activeCell.row.isFirst) {
            return editor.api.before(matrix.path, { unit: 'block' });
        }

        const { cellAbove } = activeCell;

        if (cellAbove) {
            return EditorCommands.findLeafPoint(
                editor,
                {
                    path: cellAbove.path,
                    offset: 0,
                },
                'lowest',
            );
        }
    }

    return undefined;
}

function onDownPress(editor: TablesEditor): Point | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    const cellEnd = editor.api.end(activeCell.path);

    const isCursorOnLastLine = EditorCommands.isCursorOnLastLine(
        editor,
        cellEnd,
        editor.selection.anchor,
    );

    if (isCursorOnLastLine) {
        if (activeCell.row.isLast) {
            return editor.api.after(matrix.path, { unit: 'block' });
        }

        const { cellBelow } = activeCell;

        if (cellBelow) {
            return EditorCommands.findLeafPoint(
                editor,
                {
                    path: cellBelow.path,
                    offset: 0,
                },
                'highest',
            );
        }
    }

    return undefined;
}

function onTabPress(editor: TablesEditor): Location | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell } = traverse;

    if (activeCell.row.isLast && activeCell.column.isLast) {
        TablesEditor.insertRowBelow(editor);
        return undefined;
    }

    return activeCell.nextCell?.path;
}
