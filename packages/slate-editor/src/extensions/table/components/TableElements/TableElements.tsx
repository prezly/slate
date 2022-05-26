import { isTableNode, isTableRowNode, isTableCellNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

interface Props extends RenderElementProps {}

export function TableElement(props: Props) {
    if (isTableNode(props.element)) {
        return (
            <table style={{ border: '1px solid red' }}>
                <tbody>{props.children}</tbody>
            </table>
        );
    }

    if (isTableRowNode(props.element)) {
        return <tr>{props.children}</tr>;
    }

    if (isTableCellNode(props.element)) {
        return <td>{props.children}</td>;
    }

    return null;
}
