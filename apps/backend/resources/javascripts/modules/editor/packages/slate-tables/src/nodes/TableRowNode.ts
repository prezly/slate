import { type Element, type Location } from '@udecode/plate';

import type { TablesEditor } from '../TablesEditor';

import { TableCellNode } from './TableCellNode';

export interface TableRowNode extends Element {
    children: TableCellNode[];
}

export namespace TableRowNode {
    export function createTableRow(
        editor: TablesEditor,
        props?: Partial<Omit<TableRowNode, 'children'> & { children: TableCellNode[] | number }>,
    ): TableRowNode {
        const { children, ...rest } = props ?? {};
        return editor.createTableRowNode({
            ...rest,
            children:
                typeof children === 'number'
                    ? Array.from(Array(children)).map(() => TableCellNode.createTableCell(editor))
                    : children ?? [],
        });
    }

    export function update(
        editor: TablesEditor,
        props: Partial<Omit<TableRowNode, 'children'>>,
        location: Location,
    ) {
        editor.tf.setNodes<TableRowNode>(props, {
            at: location,
            match: (node) => editor.isTableRowNode(node),
        });
    }
}
