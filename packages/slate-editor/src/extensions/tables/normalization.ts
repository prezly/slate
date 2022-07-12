import { EditorCommands } from '@prezly/slate-commons';
import {
    type TableNode,
    type TableRowNode,
    type TableCellNode,
    isTableNode,
    isTableRowNode,
    isTableCellNode,
} from '@prezly/slate-types';
import { isEqual, uniq } from 'lodash-es';
import { type Editor, type NodeEntry, Transforms } from 'slate';


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

export function normalizeTableAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (isTableNode(node)) {
        if (!node.border) {
            Transforms.setNodes<TableNode>(editor, { border: true }, { at: path });
            return true;
        }
        if (node.header !== undefined && node.header.length === 0) {
            Transforms.unsetNodes<TableNode>(editor, 'header', { at: path });
            return true;
        }
        if (node.header && node.header.length > 2) {
            const normalizedHeader = uniq([...node.header].sort());
            if (!isEqual(normalizedHeader, node.header)) {
                Transforms.setNodes<TableNode>(editor, { header: normalizedHeader }, { at: path });
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

export function normalizeRowAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (isTableRowNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            Object.keys(ALLOWED_ROW_ATTRIBUTES),
        );
    }
    return false;
}

export function normalizeCellAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (isTableCellNode(node)) {
        if (node.colspan === 1) {
            Transforms.unsetNodes<TableCellNode>(editor, 'colspan', { at: path });
            return true;
        }
        if (node.rowspan === 1) {
            Transforms.unsetNodes<TableCellNode>(editor, 'rowspan', { at: path });
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
