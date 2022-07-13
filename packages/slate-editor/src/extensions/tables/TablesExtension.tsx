import type { Extension } from '@prezly/slate-commons';
import { withTables } from '@prezly/slate-tables';
import type { TableCellNode } from '@prezly/slate-types';
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
import { composeElementDeserializer } from '#modules/html-deserialization';

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
        deserialize: {
            element: composeElementDeserializer({
                TABLE: (): TableNode | undefined => {
                    return createTableNode({});
                },
                TR: (): TableRowNode | undefined => {
                    return createTableRowNode({});
                },
                TD: (): TableCellNode | undefined => {
                    return createTableCellNode({});
                },
            }),
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
