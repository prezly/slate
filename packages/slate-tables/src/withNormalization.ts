import type { NodeEntry } from 'slate';

import * as Normalizations from './normalization';
import type { TablesEditor } from './TablesEditor';

export function withNormalization<T extends TablesEditor>(editor: T): T {
    const parent = {
        normalizeNode: editor.normalizeNode,
    };

    editor.normalizeNode = (entry) => {
        return normalizeNode(editor, entry) || parent.normalizeNode(entry);
    };

    return editor;
}

export function normalizeNode(editor: TablesEditor, entry: NodeEntry): boolean {
    return (
        normalizeNode.insertMissingCells(editor, entry) ||
        normalizeNode.removeEmptyRows(editor, entry) ||
        normalizeNode.splitColSpanCells(editor, entry) ||
        normalizeNode.splitRowSpanCells(editor, entry)
    );
}

export namespace normalizeNode {
    export const insertMissingCells = Normalizations.insertMissingCells;
    export const splitColSpanCells = Normalizations.splitColSpanCells;
    export const splitRowSpanCells = Normalizations.splitRowSpanCells;
    export const removeEmptyRows = Normalizations.removeEmptyRows;
}
