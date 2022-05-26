import classNames from 'classnames';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { Nodes } from '../../../../slate-tables';

import styles from './TableElements.module.scss';

interface Props extends RenderElementProps {
    editor: Editor;
}

export function TableElement(props: Props) {
    if (Nodes.TableNode.isTableNode(props.editor, props.element)) {
        return (
            <table
                className={classNames(styles.Table, { [styles.withBorders]: props.element.border })}
            >
                <tbody>{props.children}</tbody>
            </table>
        );
    }

    if (Nodes.TableRowNode.isTableRowNode(props.editor, props.element)) {
        return <tr>{props.children}</tr>;
    }

    if (Nodes.TableCellNode.isTableCellNode(props.editor, props.element)) {
        return (
            <td colSpan={props.element.colSpan} rowSpan={props.element.rowSpan}>
                {props.children}
            </td>
        );
    }

    return null;
}
