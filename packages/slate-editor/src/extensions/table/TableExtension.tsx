import type { Extension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor } from 'slate-react';

import { createParagraph } from '#extensions/paragraphs';

import { withTableEditor, Nodes } from '../../slate-tables';

import { TableElement } from './components';
import { TABLE_EXTENSION_ID } from './constants';
import type { TableExtensionParameters } from './types';

export function TableExtension(params: TableExtensionParameters): Extension {
    return {
        id: TABLE_EXTENSION_ID,
        renderElement: ({ attributes, children, element }: RenderElementProps, editor) => {
            if (Nodes.TableNode.isTableNode(editor, element)) {
                return (
                    <TableElement
                        attributes={attributes}
                        element={element}
                        editor={editor}
                        {...params}
                    >
                        {children}
                    </TableElement>
                );
            }

            if (Nodes.TableRowNode.isTableRowNode(editor, element)) {
                return <tr {...attributes}>{children}</tr>;
            }

            if (Nodes.TableCellNode.isTableCellNode(editor, element)) {
                return (
                    <td
                        {...attributes}
                        colSpan={element.colSpan}
                        rowSpan={element.rowSpan}
                        contentEditable
                        suppressContentEditableWarning={true}
                    >
                        {children}
                    </td>
                );
            }

            return undefined;
        },
        rootTypes: ['table'],
        withOverrides: (editor) => {
            return withTableEditor(editor, {
                focusEditor: ReactEditor.focus,
                tableNodeTypes: { table: 'table', row: 'table-row', cell: 'table-cell' },
                createContentNode: () => createParagraph({ children: [{ text: 'eee' }] }),
            });
        },
    };
}
