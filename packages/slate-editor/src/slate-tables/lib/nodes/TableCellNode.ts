import type { BaseElement, Descendant, Editor, Location, Node, NodeEntry } from 'slate';
import { Element, Transforms } from 'slate';

import { omit } from '#lodash';

import type { TableEditor } from '../core';

export interface TableCellNode extends BaseElement {
    type: string;
    rowSpan?: number;
    colSpan?: number;
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
            colSpan: getCellColspan(undefined),
            rowSpan: getCellRowspan(undefined),
            ...props,
            type: editor.tableNodeTypes.cell,
            children,
        };
    }

    export function getCellColspan(cell: TableCellNode | undefined) {
        return cell?.colSpan ?? 1;
    }

    export function getCellRowspan(cell: TableCellNode | undefined) {
        return cell?.rowSpan ?? 1;
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
        editor: Editor,
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
