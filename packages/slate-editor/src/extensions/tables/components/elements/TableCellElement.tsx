import type { TableCellNode, TableNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './elements.module.scss';
import { TableContext } from './TableContext';

interface Props extends RenderElementProps {
    element: TableCellNode;
}

export function TableCellElement({ attributes, element, children }: Props) {
    const { table } = React.useContext(TableContext);

    if (!table) {
        console.warn(`${TableCellElement.name} requires wrapping in TableContext.`);
        return null;
    }

    const isHeaderCell = React.useMemo(() => {
        return (
            (table.header?.includes('first_row') && isFirstRow(table, element)) ||
            (table.header?.includes('first_column') && isFirstColumn(table, element))
        );
    }, [table, element]);

    const Cell = isHeaderCell ? 'th' : 'td';

    return (
        <Cell
            {...attributes}
            className={styles.TableCell}
            colSpan={element.colspan}
            rowSpan={element.rowspan}
            contentEditable
            suppressContentEditableWarning={true}
        >
            {children}
        </Cell>
    );
}

function isFirstRow(table: TableNode, cell: TableCellNode): boolean {
    return table.children[0]?.children.includes(cell);
}

function isFirstColumn(table: TableNode, cell: TableCellNode): boolean {
    return table.children.some((row) => row.children[0] === cell);
}
