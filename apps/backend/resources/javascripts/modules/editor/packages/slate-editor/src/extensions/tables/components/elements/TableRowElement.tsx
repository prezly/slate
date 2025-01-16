import type { TableRowNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './elements.module.scss';

interface Props extends RenderElementProps {
    element: TableRowNode;
}

export function TableRowElement({ attributes, children }: Props) {
    return (
        <tr className={styles.TableRow} {...attributes}>
            {children}
        </tr>
    );
}
