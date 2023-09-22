import { useRegisterExtension } from '@prezly/slate-commons';
import {
    onKeyDown,
    TablesEditor,
    withTablesSchema,
    getFragment,
    deleteBackward,
    deleteForward,
} from '@prezly/slate-tables';
import {
    isTableCellNode,
    isTableNode,
    isTableRowNode,
    type TableCellNode,
    type TableNode,
    type TableRowNode,
} from '@prezly/slate-types';
import React, { useEffect } from 'react';
import type { Element } from 'slate';
import { useSlateStatic, type RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { TableCellElement, TableElement, TableRowElement } from './components';
import { createTableCellNode, createTableNode, createTableRowNode } from './lib';
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

export function TablesExtension({ createDefaultElement }: Parameters) {
    const editor = useSlateStatic();

    // Register Tables editor extension schema
    useEffect(() => {
        withTablesSchema(editor, {
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
    }, [editor]);

    return useRegisterExtension({
        id: EXTENSION_ID,
        isRichBlock: isTableNode,
        normalizeNode: [normalizeTableAttributes, normalizeRowAttributes, normalizeCellAttributes],
        deleteBackward: (unit, next) => {
            if (TablesEditor.isTablesEditor(editor)) {
                return deleteBackward(editor, unit, next);
            }
            next(unit);
        },
        deleteForward: (unit, next) => {
            if (TablesEditor.isTablesEditor(editor)) {
                return deleteForward(editor, unit, next);
            }
            next(unit);
        },
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
                return (
                    onKeyDown(event, editor) ||
                    onClipboardHotkey(event, editor, createDefaultElement)
                );
            }
            return false;
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
        getFragment: (next) => {
            if (TablesEditor.isTablesEditor(editor)) {
                return getFragment(editor, next);
            }
            return next();
        },
    });
}
