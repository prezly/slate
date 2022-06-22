import type { BaseElement, Location, Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

import type { TablesEditor } from '../TablesEditor';

import { TableCellNode } from './TableCellNode';

export interface TableRowNode extends BaseElement {
    type: string;
    children: TableCellNode[];
}

export namespace TableRowNode {
    export function isTableRowNodeEntry(
        editor: TablesEditor,
        value: NodeEntry<Node> | undefined,
    ): value is NodeEntry<TableRowNode> {
        return value !== undefined && editor.isTableRowNode(value[0]);
    }

    export function createTableRowNode(
        editor: TablesEditor,
        props?: Omit<TableRowNode, 'type' | 'children'>,
        children: TableCellNode[] | number = 1,
    ): TableRowNode {
        return {
            ...props,
            type: editor.tableNodeTypes.row,
            children:
                typeof children === 'number'
                    ? Array.from(Array(children)).map(() =>
                          TableCellNode.createTableCellNode(editor),
                      )
                    : children,
        };
    }

    export function update(
        editor: TablesEditor,
        props: Partial<Omit<TableRowNode, 'children' | 'type'>>,
        location: Location,
    ) {
        Transforms.setNodes<TableRowNode>(editor, props, {
            at: location,
            match: (node) => editor.isTableRowNode(node),
        });
    }
}
