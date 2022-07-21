import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Location, BasePoint } from 'slate';
import { Editor } from 'slate';
import { Transforms } from 'slate';

import { TablesEditor } from '../TablesEditor';

import { Traverse } from './Traverse';

export function onKeyDown(event: KeyboardEvent<Element>, editor: TablesEditor) {
    if (!editor.selection) {
        return;
    }

    let locationToSelect: Location | undefined | null = null;

    if (isHotkey('up', event)) {
        locationToSelect = onUpPress(editor);
    }

    if (isHotkey('down', event)) {
        locationToSelect = onDownPress(editor);
    }

    if (isHotkey('tab', event)) {
        locationToSelect = onTabPress(editor);
        event.preventDefault();
    }

    if (locationToSelect) {
        Transforms.select(editor, locationToSelect);
        event.stopPropagation();
        event.preventDefault();
    }
}

function onUpPress(editor: TablesEditor): BasePoint | null | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    const [cellStart] = Editor.edges(editor, activeCell.path);

    const isCursorOnFirstLine = EditorCommands.isCursorOnEdgeOfContainer(
        editor,
        cellStart,
        editor.selection.anchor,
        'top',
    );

    if (isCursorOnFirstLine) {
        if (activeCell.row.isFirst) {
            return Editor.before(editor, matrix.path, { unit: 'block' });
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

function onDownPress(editor: TablesEditor): BasePoint | null | undefined {
    if (!editor.selection) {
        return undefined;
    }

    const traverse = Traverse.create(editor, editor.selection);

    if (!traverse) {
        return undefined;
    }

    const { activeCell, matrix } = traverse;

    const [, cellEnd] = Editor.edges(editor, activeCell.path);

    const isCursorOnLastLine = EditorCommands.isCursorOnEdgeOfContainer(
        editor,
        cellEnd,
        editor.selection.anchor,
        'bottom',
    );

    if (isCursorOnLastLine) {
        if (activeCell.row.isLast) {
            return Editor.after(editor, matrix.path, { unit: 'block' });
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

function onTabPress(editor: TablesEditor): Location | null | undefined {
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
