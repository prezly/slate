import { type Element, type Location } from '@udecode/plate';

import { Traverse } from '../core';
import type { TablesEditor } from '../TablesEditor';

import { TableRowNode } from './TableRowNode';

export type TableHeader = 'first_row' | 'first_column';

export interface TableNode extends Element {
    children: TableRowNode[];
    border?: boolean;
    header?: TableHeader[];
}

export namespace TableNode {
    export function createTable(
        editor: TablesEditor,
        props?: Partial<Omit<TableNode, 'children'>> & {
            rowsCount?: number;
            columnsCount?: number;
        },
    ): TableNode {
        const { rowsCount = 2, columnsCount = 2, ...rest } = props ?? {};
        const rows = Array.from(Array(rowsCount)).map(() =>
            TableRowNode.createTableRow(editor, { children: columnsCount }),
        );
        return editor.createTableNode({
            ...rest,
            children: rows,
        });
    }

    export function update(
        editor: TablesEditor,
        props: Partial<Omit<TableNode, 'children'>>,
        location: Location | undefined = editor.selection ?? undefined,
    ) {
        editor.tf.setNodes<TableNode>(props, {
            at: location,
            match: (node) => editor.isTableNode(node),
        });
    }

    export function toggleTableHeader(
        editor: TablesEditor,
        location: Location | undefined = editor.selection ?? undefined,
        headerType: TableHeader,
    ) {
        if (!location) {
            return undefined;
        }

        const traverse = Traverse.create(editor, location);

        if (!traverse) {
            return undefined;
        }

        const isAlreadyEnabled = traverse.matrix.node.header?.includes(headerType);
        const newHeader = isAlreadyEnabled
            ? traverse.matrix.node.header?.filter((h) => h !== headerType)
            : [...(traverse.matrix.node.header ?? []), headerType];

        editor.tf.setNodes<TableNode>(
            { header: newHeader },
            {
                at: location,
                match: (n) => n === traverse.matrix.node,
            },
        );

        // When we mark text in cell as bold and then mark the first row as header the normalization is not called
        // and bold mark still present in cell content
        editor.tf.normalize({ force: true });

        return newHeader;
    }
}
