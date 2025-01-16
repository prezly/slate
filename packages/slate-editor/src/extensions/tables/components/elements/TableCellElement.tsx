import { TablesEditor } from '@prezly/slate-tables';
import type { TableCellNode } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import classNames from 'classnames';
import React from 'react';

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

    const isHeaderCell = React.useMemo(
        () => TablesEditor.isHeaderCell(table, element),
        [table, element],
    );

    const Cell = isHeaderCell ? 'th' : 'td';

    return (
        <Cell
            {...attributes}
            className={classNames(styles.TableCell, {
                [styles['TableCell--header']]: isHeaderCell,
            })}
            colSpan={element.colspan}
            rowSpan={element.rowspan}
        >
            {children}
        </Cell>
    );
}
