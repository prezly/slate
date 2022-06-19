import type { Extension } from '@prezly/slate-commons';
import { withTableEditor } from '@prezly/slate-tables';
import {
    isTableNode,
    isTableRowNode,
    isTableCellNode,
    TABLE_NODE_TYPE,
    TABLE_ROW_NODE_TYPE,
    TABLE_CELL_NODE_TYPE,
} from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor } from 'slate-react';

import { createParagraph } from '#extensions/paragraphs';

import { TableElement, TableRow, TableCellElement } from './components';
import { TABLE_EXTENSION_ID } from './constants';
import type { TableExtensionParameters } from './types';

export function TableExtension(params: TableExtensionParameters): Extension {
    return {
        id: TABLE_EXTENSION_ID,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isTableNode(element)) {
                return (
                    <TableElement attributes={attributes} element={element} {...params}>
                        {children}
                    </TableElement>
                );
            }

            if (isTableRowNode(element)) {
                return (
                    <TableRow attributes={attributes} element={element}>
                        {children}
                    </TableRow>
                );
            }

            if (isTableCellNode(element)) {
                return (
                    <TableCellElement attributes={attributes} element={element} {...params}>
                        {children}
                    </TableCellElement>
                );
            }

            return undefined;
        },
        withOverrides: (editor) => {
            return withTableEditor(editor, {
                focusEditor: () => ReactEditor.focus(editor),
                tableNodeTypes: {
                    table: TABLE_NODE_TYPE,
                    row: TABLE_ROW_NODE_TYPE,
                    cell: TABLE_CELL_NODE_TYPE,
                },
                createContentNode: () => createParagraph({ children: [{ text: '' }] }),
            });
        },
    };
}
