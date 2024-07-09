import type { TableNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { TableMenu } from '../TableMenu';

import styles from './elements.module.scss';
import { TableContext } from './TableContext';

interface Props extends RenderElementProps {
    element: TableNode;
}

export function TableElement({ attributes, element, children }: Props) {
    return (
        <EditorBlock
            {...attributes} // contains `ref`
            element={element}
            overflow="auto"
            overlay={false}
            renderMenu={() => <TableMenu element={element} />}
            renderEditableFrame={() => {
                return (
                    <TableContext.Provider value={{ table: element }}>
                        <table
                            className={classNames(styles.Table, {
                                [styles['Table--withBorders']]: element.border,
                            })}
                        >
                            <tbody>{children}</tbody>
                        </table>
                    </TableContext.Provider>
                );
            }}
        />
    );
}
