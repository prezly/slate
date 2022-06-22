import type { TableCellNode } from '@prezly/slate-types';
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
        const shouldCheckFirstRow = table.header?.some((h) => h === 'first_row');

        if (shouldCheckFirstRow) {
            const isCurrentCellInFirstRow = table.children?.[0].children?.some(
                (cell) => cell === element,
            );

            if (isCurrentCellInFirstRow) {
                return isCurrentCellInFirstRow;
            }
        }

        return false;
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
