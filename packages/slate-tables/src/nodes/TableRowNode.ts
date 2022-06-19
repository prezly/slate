import type { BaseElement, Location, Node, NodeEntry } from 'slate';
import { Element, Transforms } from 'slate';

import type { TableEditor } from '../TableEditor';

import { TableCellNode } from './TableCellNode';

export interface TableRowNode extends BaseElement {
    type: string;
    children: TableCellNode[];
}

export namespace TableRowNode {
    export function isTableRowNode(
        editor: TableEditor,
        value: Node | undefined,
    ): value is TableRowNode {
        return Element.isElementType<TableRowNode>(value, editor.tableNodeTypes.row);
    }

    export function isTableRowNodeEntry(
        editor: TableEditor,
        value: NodeEntry<Node> | undefined,
    ): value is NodeEntry<TableRowNode> {
        return isTableRowNode(editor, value?.[0]);
    }

    export function createTableRowNode(
        editor: TableEditor,
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
        editor: TableEditor,
        props: Partial<Omit<TableRowNode, 'children' | 'type'>>,
        location: Location,
    ) {
        Transforms.setNodes<TableRowNode>(editor, props, {
            at: location,
            match: (n) => isTableRowNode(editor, n),
        });
    }
}
