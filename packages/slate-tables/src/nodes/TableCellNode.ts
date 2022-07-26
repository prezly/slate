import type { Element, Location } from 'slate';
import { Transforms } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export interface TableCellNode extends Element {
    rowspan?: number;
    colspan?: number;
}

const IMPLIED_COLSPAN = 1;
const IMPLIED_ROWSPAN = 1;

export namespace TableCellNode {
    export function createTableCell(
        editor: TablesEditor,
        props?: Partial<TableCellNode>,
    ): TableCellNode {
        const { children, ...rest } = props ?? {};
        return editor.createTableCellNode({
            ...rest,
            children: children ?? [editor.createContentNode()],
        });
    }

    export function getCellColspan(cell: TableCellNode | undefined) {
        return cell?.colspan ?? IMPLIED_COLSPAN;
    }

    export function getCellRowspan(cell: TableCellNode | undefined) {
        return cell?.rowspan ?? IMPLIED_ROWSPAN;
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
        props: Partial<Omit<TableCellNode, 'children'>>,
        location: Location,
    ) {
        Transforms.setNodes<TableCellNode>(editor, props, {
            at: location,
            match: (node) => editor.isTableCellNode(node),
        });
    }
}
