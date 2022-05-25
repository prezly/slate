import type { ComponentMeta } from '@storybook/react';
import React from 'react';
import { useState } from 'react';
import { createEditor } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

import { TableEditor, withTableEditor, Nodes } from '../lib';

import { initialValue } from './initialValue';
import styles from './styles.module.scss';

export default {
    title: 'TablePoc',
} as ComponentMeta<'div'>;

export function Base() {
    const [editor] = useState(() =>
        withTableEditor(withReact(createEditor()), {
            focusEditor: ReactEditor.focus,
            tableNodeTypes: { table: 'table', row: 'table-row', cell: 'table-cell' },
            createContentNode: () => ({ text: '' }),
        }),
    );
    const [value, setValue] = useState(initialValue);
    const [, forceUpdate] = useState(() => Math.random());

    const renderElement = (props: RenderElementProps) => {
        if (Nodes.TableNode.isTableNode(editor, props.element)) {
            return (
                <table
                    {...props.attributes}
                    className={`${props.element.border ? styles.withBorders : ''}`}
                >
                    <tbody>{props.children}</tbody>
                </table>
            );
        }

        if (Nodes.TableRowNode.isTableRowNode(editor, props.element)) {
            return <tr {...props.attributes}>{props.children}</tr>;
        }

        if (Nodes.TableCellNode.isTableCellNode(editor, props.element)) {
            return (
                <td
                    {...props.attributes}
                    colSpan={props.element.colSpan}
                    rowSpan={props.element.rowSpan}
                >
                    {props.children}
                </td>
            );
        }

        switch (props.element.type) {
            case 'paragraph':
                return <p {...props.attributes}>{props.children}</p>;
            case 'break':
                return <br />;
        }

        return props.children;
    };

    const isNotInTable = !TableEditor.isInTable(editor);

    console.log('VALUE:', value);

    return (
        <div>
            <div>
                <button onClick={() => TableEditor.insertTable(editor)}>Insert table</button>{' '}
                <button onClick={() => TableEditor.removeTable(editor)} disabled={isNotInTable}>
                    Remove table
                </button>
                <span> | </span>
                <button onClick={() => TableEditor.insertRowAbove(editor)} disabled={isNotInTable}>
                    Insert row above
                </button>{' '}
                <button onClick={() => TableEditor.insertRowBelow(editor)} disabled={isNotInTable}>
                    Insert row below
                </button>{' '}
                <button onClick={() => TableEditor.removeRow(editor)} disabled={isNotInTable}>
                    Remove row
                </button>{' '}
                <span> | </span>
                <button
                    onClick={() => TableEditor.insertColumnLeft(editor)}
                    disabled={isNotInTable}
                >
                    Insert column left
                </button>{' '}
                <button
                    onClick={() => TableEditor.insertColumnRight(editor)}
                    disabled={isNotInTable}
                >
                    Insert column right
                </button>{' '}
                <button onClick={() => TableEditor.removeColumn(editor)} disabled={isNotInTable}>
                    Remove column
                </button>{' '}
                <span> | </span>
                <button onClick={() => TableEditor.splitCellLeft(editor)} disabled={isNotInTable}>
                    Split cell left
                </button>{' '}
                <button onClick={() => TableEditor.splitCellAbove(editor)} disabled={isNotInTable}>
                    Split cell above
                </button>{' '}
                <button onClick={() => TableEditor.splitCellRight(editor)} disabled={isNotInTable}>
                    Split cell right
                </button>{' '}
                <button onClick={() => TableEditor.splitCellBelow(editor)} disabled={isNotInTable}>
                    Split cell below
                </button>{' '}
            </div>

            <Slate editor={editor} value={value} onChange={setValue}>
                <Editable
                    renderElement={renderElement}
                    onClick={() => forceUpdate(Math.random())}
                    onKeyUp={() => forceUpdate(Math.random())}
                    onChange={() => forceUpdate(Math.random())}
                    onFocus={() => forceUpdate(Math.random())}
                    onBlur={() => forceUpdate(Math.random())}
                />
            </Slate>
        </div>
    );
}
