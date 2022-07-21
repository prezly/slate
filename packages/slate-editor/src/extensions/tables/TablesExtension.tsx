import type { Extension } from '@prezly/slate-commons';
import {
    withTables,
    TablesEditor,
    onKeyDown,
    withTablesDeleteBehavior,
    withTablesCopyPasteBehavior,
} from '@prezly/slate-tables';
import {
    type TableNode,
    type TableRowNode,
    type TableCellNode,
    isTableNode,
    isTableRowNode,
    isTableCellNode,
} from '@prezly/slate-types';
import { flow } from 'lodash-es';
import React from 'react';
import type { Element } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { TableElement, TableRowElement, TableCellElement } from './components';
import { createTableNode, createTableRowNode, createTableCellNode } from './lib';
import {
    normalizeCellAttributes,
    normalizeRowAttributes,
    normalizeTableAttributes,
} from './normalization';
import { onClipboardHotkey } from './onKeyDown';

export const EXTENSION_ID = TablesExtension.name;

interface Parameters {
    createDefaultElement: (props?: Partial<Element>) => Element;
}

export function TablesExtension({ createDefaultElement }: Parameters): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode: [normalizeTableAttributes, normalizeRowAttributes, normalizeCellAttributes],
        deserialize: {
            element: composeElementDeserializer({
                TABLE: (): TableNode => {
                    return createTableNode({});
                },
                TR: (): TableRowNode => {
                    return createTableRowNode({});
                },
                TD: (element: HTMLElement): TableCellNode => {
                    const td = element as HTMLTableCellElement;

                    return createTableCellNode({
                        colspan: td.colSpan,
                        rowspan: td.rowSpan,
                    });
                },
                TH: (element: HTMLElement): TableCellNode => {
                    const td = element as HTMLTableCellElement;

                    return createTableCellNode({
                        colspan: td.colSpan,
                        rowspan: td.rowSpan,
                    });
                },
            }),
        },
        onKeyDown: (event, editor) => {
            if (TablesEditor.isTablesEditor(editor)) {
                onKeyDown(event, editor);
                onClipboardHotkey(event, editor, createDefaultElement);
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
            const tablesEditor = withTables(editor, {
                createContentNode: createDefaultElement,
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

            return flow([withTablesCopyPasteBehavior, withTablesDeleteBehavior])(tablesEditor);
        },
    };
}
