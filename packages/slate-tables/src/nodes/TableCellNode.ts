import type { BaseElement, Descendant, Location } from 'slate';
import { Transforms } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export interface TableCellNode extends BaseElement {
    type: string;
    rowspan?: number;
    colspan?: number;
}

export namespace TableCellNode {
    export function createTableCellNode(
        editor: TablesEditor,
        props?: Omit<TableCellNode, 'type' | 'children'>,
        children: Descendant[] = [editor.createContentNode()],
    ): TableCellNode {
        return {
            colspan: getCellColspan(undefined),
            rowspan: getCellRowspan(undefined),
            ...props,
            type: editor.tableNodeTypes.cell,
            children,
        };
    }

    export function getCellColspan(cell: TableCellNode | undefined) {
        return cell?.colspan ?? 1;
    }

    export function getCellRowspan(cell: TableCellNode | undefined) {
        return cell?.rowspan ?? 1;
    }

    export function calculateCellRowSpan(
        cell: TableCellNode | undefined,
        action: '+' | '-',
        amount: number,
    ) {
        const currentRowSpan = getCellRowspan(cell);
        const newRowSpan = action === '+' ? currentRowSpan + amount : currentRowSpan - amount;

        if (newRowSpan < 1) {
            return getCellRowspan(undefined);
        }

        return newRowSpan;
    }

    export function calculateCellColSpan(
        cell: TableCellNode | undefined,
        action: '+' | '-',
        amount: number,
    ) {
        const currentColSpan = getCellColspan(cell);
        const newColSPan = action === '+' ? currentColSpan + amount : currentColSpan - amount;

        if (newColSPan < 1) {
            return getCellColspan(undefined);
        }

        return newColSPan;
    }

    export function update(
        editor: TablesEditor,
        props: Partial<Omit<TableCellNode, 'children' | 'type'>>,
        location: Location,
    ) {
        const { type, children, ...fixedProps } = props as TableCellNode;

        Transforms.setNodes<TableCellNode>(editor, fixedProps, {
            at: location,
            match: (node) => editor.isTableCellNode(node),
        });
    }
}
