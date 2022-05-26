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
        renderElement: (props: RenderElementProps, editor) => {
            if (
                Nodes.TableNode.isTableNode(editor, props.element) ||
                Nodes.TableRowNode.isTableRowNode(editor, props.element) ||
                Nodes.TableCellNode.isTableCellNode(editor, props.element)
            ) {
                return (
                    <TableElement
                        attributes={props.attributes}
                        element={props.element}
                        editor={editor}
                        {...params}
                    >
                        {props.children}
                    </TableElement>
                );
            }

            return undefined;
        },
        rootTypes: ['table', 'paragraph'],
        withOverrides: (editor) => {
            return withTableEditor(editor, {
                focusEditor: ReactEditor.focus,
                tableNodeTypes: { table: 'table', row: 'table-row', cell: 'table-cell' },
                createContentNode: () => createParagraph({ children: [{ text: '' }] }),
            });
        },
    };
}
