import type { BaseElement, Editor, Location, Node, NodeEntry } from 'slate';
import { Element, Transforms } from 'slate';

import { TableRowNode } from './TableRowNode';

export interface TableNode extends BaseElement {
    type: string;
    children: TableRowNode[];
    border?: boolean;
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
        return { type: editor.tableNodeTypes.table, children: rows, border: true };
    }

    export function update(
        editor: Editor,
        props: Partial<Omit<TableNode, 'children' | 'type'>>,
        location: Location,
    ) {
        Transforms.setNodes<TableNode>(editor, props, {
            at: location,
            match: (n) => isTableNode(editor, n),
        });
    }
}
