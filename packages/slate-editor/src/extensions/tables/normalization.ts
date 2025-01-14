import { EditorCommands } from '@prezly/slate-commons';
import {
    type TableNode,
    type TableRowNode,
    type TableCellNode,
    isTableNode,
    isTableRowNode,
    isTableCellNode,
} from '@prezly/slate-types';
import { isEqual, uniq } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import { type NodeEntry } from 'slate';

const ALLOWED_TABLE_ATTRIBUTES: { [key in keyof TableNode]: boolean } = {
    type: true,
    header: true,
    border: true,
    children: true,
};

const ALLOWED_ROW_ATTRIBUTES: { [key in keyof TableRowNode]: boolean } = {
    type: true,
    children: true,
};

const ALLOWED_CELL_ATTRIBUTES: { [key in keyof TableCellNode]: boolean } = {
    type: true,
    colspan: true,
    rowspan: true,
    children: true,
};

export function normalizeTableAttributes(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (isTableNode(node)) {
        if (!node.border) {
            editor.setNodes<TableNode>({ border: true }, { at: path });
            return true;
        }
        if (node.header !== undefined && node.header.length === 0) {
            editor.unsetNodes('header', { at: path });
            return true;
        }
        if (node.header && node.header.length > 2) {
            const normalizedHeader = uniq([...node.header].sort());
            if (!isEqual(normalizedHeader, node.header)) {
                editor.setNodes<TableNode>({ header: normalizedHeader }, { at: path });
                return true;
            }
        }
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            Object.keys(ALLOWED_TABLE_ATTRIBUTES),
        );
    }
    return false;
}

export function normalizeRowAttributes(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (isTableRowNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            Object.keys(ALLOWED_ROW_ATTRIBUTES),
        );
    }
    return false;
}

export function normalizeCellAttributes(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (isTableCellNode(node)) {
        if (node.colspan === 1) {
            editor.unsetNodes('colspan', { at: path });
            return true;
        }
        if (node.rowspan === 1) {
            editor.unsetNodes('rowspan', { at: path });
            return true;
        }
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            Object.keys(ALLOWED_CELL_ATTRIBUTES),
        );
    }
    return false;
}
