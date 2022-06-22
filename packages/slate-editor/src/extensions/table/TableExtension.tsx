import type { Extension } from '@prezly/slate-commons';
import { withTables } from '@prezly/slate-tables';
import {
    type TableNode,
    type TableRowNode,
    isTableNode,
    isTableRowNode,
    isTableCellNode,
} from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { createParagraph } from '#extensions/paragraphs';

import { TableElement, TableRow, TableCellElement } from './components';
import { TABLE_EXTENSION_ID } from './constants';
import { createTableNode, createTableRowNode, createTableCellNode } from './lib';
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
            return withTables(editor, {
                createContentNode: createParagraph,
                createTableNode: (props) => createTableNode(props as Partial<TableNode>),
                createTableRowNode: (props) => createTableRowNode(props as Partial<TableRowNode>),
                createTableCellNode,
                isTableNode,
                isTableRowNode,
                isTableCellNode,
            });
        },
    };
}
