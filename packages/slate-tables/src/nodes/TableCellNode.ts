import { omit } from 'lodash-es';
import type { BaseElement, Descendant, Location, Node, NodeEntry } from 'slate';
import { Element, Transforms } from 'slate';

import type { TableEditor } from '../TableEditor';

export interface TableCellNode extends BaseElement {
    type: string;
    rowspan?: number;
    colspan?: number;
}

export namespace TableCellNode {
    export function isTableCellNode(
        editor: TableEditor,
        value: Node | undefined,
    ): value is TableCellNode {
        return Element.isElementType<TableCellNode>(value, editor.tableNodeTypes.cell);
    }

    export function isTableCellNodeEntry(
        editor: TableEditor,
        value: NodeEntry<Node> | undefined,
    ): value is NodeEntry<TableCellNode> {
        return isTableCellNode(editor, value?.[0]);
    }

    export function createTableCellNode(
        editor: TableEditor,
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
        editor: TableEditor,
        props: Partial<Omit<TableCellNode, 'children' | 'type'>>,
        location: Location,
    ) {
        const fixedProps = omit(props, 'type', 'children');
        Transforms.setNodes<TableCellNode>(editor, fixedProps, {
            at: location,
            match: (n) => isTableCellNode(editor, n),
        });
    }
}
