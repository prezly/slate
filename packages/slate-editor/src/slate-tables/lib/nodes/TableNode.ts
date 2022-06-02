import type { BaseElement, Editor, Location, Node, NodeEntry } from 'slate';
import { Element, Transforms } from 'slate';

import { Traverse } from '../core';

import { TableRowNode } from './TableRowNode';

export type TableHeader = 'first_row' | 'first_column';
export interface TableNode extends BaseElement {
    type: string;
    children: TableRowNode[];
    border: boolean;
    header: TableHeader[];
}

export namespace TableNode {
    export function isTableNode(editor: Editor, value: Node | undefined): value is TableNode {
        return Element.isElementType<TableNode>(value, editor.tableNodeTypes.table);
    }

    export function isTableNodeEntry(
        editor: Editor,
        value: NodeEntry<Node> | undefined,
    ): value is NodeEntry<TableNode> {
        return isTableNode(editor, value?.[0]);
    }

    export function createTableNode(editor: Editor, rowsCount = 2, columnsCount = 2): TableNode {
        const rows = Array.from(Array(rowsCount)).map(() =>
            TableRowNode.createTableRowNode(editor, {}, columnsCount),
        );
        return {
            type: editor.tableNodeTypes.table,
            children: rows,
            border: true,
            header: ['first_row'],
        };
    }

    export function update(
        editor: Editor,
        props: Partial<Omit<TableNode, 'children' | 'type'>>,
        location: Location | undefined = editor.selection ?? undefined,
    ) {
        Transforms.setNodes<TableNode>(editor, props, {
            at: location,
            match: (n) => isTableNode(editor, n),
        });
    }

    export function toggleTableHeader(
        editor: Editor,
        location: Location | undefined = editor.selection ?? undefined,
        headerType: TableHeader,
    ) {
        if (!location) {
            return false;
        }

        const traverse = Traverse.create(editor, location);

        if (!traverse) {
            return false;
        }

        const hasHeaderType = traverse.matrix.node.header.some((h) => h === headerType);
        const newHeader = hasHeaderType
            ? traverse.matrix.node.header.filter((h) => h !== headerType)
            : [...traverse.matrix.node.header, headerType];

        Transforms.setNodes<TableNode>(
            editor,
            { header: newHeader },
            {
                at: location,
                match: (n) => n === traverse.matrix.node,
            },
        );

        return true;
    }
}
