import type { Extension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor, useSlateStatic } from 'slate-react';

import { withTableEditor, Nodes } from '../../slate-tables';

import { TableElement } from './components';
import { TABLE_EXTENSION_ID } from './constants';
import type { TableExtensionParameters } from './types';

export function TableExtension(params: TableExtensionParameters): Extension {
    return {
        id: TABLE_EXTENSION_ID,
        renderElement: (props: RenderElementProps) => {
            return <RenderTable {...props} params={params} />;
        },
        rootTypes: ['table'],
        withOverrides: (editor) => {
            return withTableEditor(editor, {
                focusEditor: ReactEditor.focus,
                tableNodeTypes: { table: 'table', row: 'table-row', cell: 'table-cell' },
                createContentNode: () => ({ text: '' }),
            });
        },
    };
}

function RenderTable({
    attributes,
    children,
    element,
    params,
}: RenderElementProps & { params: TableExtensionParameters }) {
    const editor = useSlateStatic();

    if (
        Nodes.TableNode.isTableNode(editor, element) ||
        Nodes.TableRowNode.isTableRowNode(editor, element) ||
        Nodes.TableCellNode.isTableCellNode(editor, element)
    ) {
        return (
            <TableElement attributes={attributes} element={element} {...params}>
                {children}
            </TableElement>
        );
    }

    return null;
}
