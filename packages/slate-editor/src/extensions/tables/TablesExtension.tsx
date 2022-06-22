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

import { TableElement, TableRowElement, TableCellElement } from './components';
import { createTableNode, createTableRowNode, createTableCellNode } from './lib';

export const EXTENSION_ID = TablesExtension.name;

export function TablesExtension(): Extension {
    return {
        id: EXTENSION_ID,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isTableNode(element)) {
                return (
                    <TableElement attributes={attributes} element={element}>
                        {children}
                    </TableElement>
                );
            }

            if (isTableRowNode(element)) {
                return (
                    <TableRowElement attributes={attributes} element={element}>
                        {children}
                    </TableRowElement>
                );
            }

            if (isTableCellNode(element)) {
                return (
                    <TableCellElement attributes={attributes} element={element}>
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