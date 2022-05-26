import classNames from 'classnames';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { Nodes } from '../../../../slate-tables';
import { TableMenu } from '../TableMenu';

import styles from './TableElements.module.scss';

interface Props extends RenderElementProps {
    editor: Editor;
}

export function TableElement({ attributes, element, editor, children }: Props) {
    if (Nodes.TableNode.isTableNode(editor, element)) {
        return (
            <EditorBlock
                {...attributes} // contains `ref`
                border
                element={element}
                overlay={false}
                contentEditable
                renderMenu={({ onClose }) => (
                    <TableMenu onClose={onClose} element={element} editor={editor} />
                )}
                renderBlock={() => {
                    return (
                        <table
                            className={classNames(styles.Table, {
                                [styles.withBorders]: element.border,
                            })}
                        >
                            <tbody>{children}</tbody>
                        </table>
                    );
                }}
                void
            >
                {children}
            </EditorBlock>
        );
    }

    if (Nodes.TableRowNode.isTableRowNode(editor, element)) {
        return <tr {...attributes}>{children}</tr>;
    }

    if (Nodes.TableCellNode.isTableCellNode(editor, element)) {
        return (
            <td {...attributes} colSpan={element.colSpan} rowSpan={element.rowSpan}>
                {children}
            </td>
        );
    }

    return null;
}
