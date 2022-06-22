import type { TableRowNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './elements.module.scss';
import { TableContext } from './TableContext';

interface Props extends RenderElementProps {
    element: TableRowNode;
}

export function TableRowElement({ element, attributes, children }: Props) {
    const ctx = React.useContext(TableContext);

    const isHeaderRow = React.useMemo(() => {
        return (
            ctx.table.header?.some((h) => h === 'first_row') &&
            ctx.table.children.findIndex((row) => row === element) === 0
        );
    }, [ctx.table, element]);

    return (
        <tr
            className={classNames(styles.TableRow, { [styles['TableRow--header']]: isHeaderRow })}
            {...attributes}
        >
            {children}
        </tr>
    );
}
