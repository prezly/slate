import type { Extension } from '@prezly/slate-commons';
import { withTables, TablesEditor, onKeyDown } from '@prezly/slate-tables';
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
import {
    normalizeCellAttributes,
    normalizeRowAttributes,
    normalizeTableAttributes,
} from './normalization';

export const EXTENSION_ID = TablesExtension.name;

export function TablesExtension(): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode: [normalizeTableAttributes, normalizeRowAttributes, normalizeCellAttributes],
        onKeyDown: (event, editor) => {
            if (TablesEditor.isTablesEditor(editor)) {
                onKeyDown(event, editor);
            }
        },
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
                createTableNode: ({ children, ...props }) =>
                    createTableNode({
                        ...props,
                        children: children as TableNode['children'] | undefined,
                    }),
                createTableRowNode: ({ children, ...props }) =>
                    createTableRowNode({
                        ...props,
                        children: children as TableRowNode['children'] | undefined,
                    }),
                createTableCellNode,
                isTableNode,
                isTableRowNode,
                isTableCellNode,
            });
        },
    };
}
