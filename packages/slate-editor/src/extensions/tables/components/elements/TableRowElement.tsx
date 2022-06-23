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
    const { table } = React.useContext(TableContext);

    if (!table) {
        console.warn(`${TableRowElement.name} requires wrapping in TableContext.`);
        return null;
    }

    const isHeaderRow = React.useMemo(() => {
        return table.header?.includes('first_row') && table.children[0] === element;
    }, [table, element]);

    return (
        <tr
            className={classNames(styles.TableRow, { [styles['TableRow--header']]: isHeaderRow })}
            {...attributes}
        >
            {children}
        </tr>
    );
}
