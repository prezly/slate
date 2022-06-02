import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import type { TableCellNode } from 'slate-tables/lib/nodes';

import { TableContext } from './TableContext';

interface Props extends RenderElementProps {
    element: TableCellNode;
    editor: Editor;
}

export function TableCellElement({ attributes, element, children }: Props) {
    const ctx = React.useContext(TableContext);

    const isHeaderCell = React.useMemo(() => {
        const shouldCheckFirstRow = ctx.table.header?.some((h) => h === 'first_row');

        if (shouldCheckFirstRow) {
            const isCurrentCellInFirstRow = ctx.table.children?.[0].children?.some(
                (cell) => cell === element,
            );

            if (isCurrentCellInFirstRow) {
                return isCurrentCellInFirstRow;
            }
        }

        const shouldCheckFirstColumn = ctx.table.header?.some((h) => h === 'first_column');

        if (shouldCheckFirstColumn) {
            const isCurrentCellInFirstColumn = ctx.table.children.some(
                (row) => row.children?.[0] === element,
            );

            if (isCurrentCellInFirstColumn) {
                return isCurrentCellInFirstColumn;
            }
        }

        return false;
    }, [ctx.table, element]);

    const Cell = isHeaderCell ? 'th' : 'td';

    return (
        <Cell
            {...attributes}
            colSpan={element.colspan}
            rowSpan={element.rowspan}
            contentEditable
            suppressContentEditableWarning={true}
            style={{ whiteSpace: 'pre' }}
        >
            {children}
        </Cell>
    );
}
