import type { ListNode } from '@prezly/slate-types';
import { BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

interface Props extends HTMLAttributes<HTMLOListElement> {
    attributes?: RenderElementProps['attributes'];
    element: ListNode;
}

export const ListElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => {
    const List = element.type === BULLETED_LIST_NODE_TYPE ? 'ul' : 'ol';

    return (
        <List
            {...attributes}
            {...props}
            className={classNames(className, 'editor-v4-list-element', {
                'editor-v4-list-element--bulleted': element.type === BULLETED_LIST_NODE_TYPE,
                'editor-v4-list-element--numbered': element.type === NUMBERED_LIST_NODE_TYPE,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
            style={{ textAlign: element.align }}
        >
            {children}
        </List>
    );
};
