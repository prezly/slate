import type { ListNode } from '@prezly/slate-types';
import { Alignment, BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
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
                /*
                 * `inherit` is a fourth mode to inherit alignment from above.
                 * It is needed, as "inherit" presentation will have better (i.e. matching
                 * expectations) placement of the list bullets outside the text flow.
                 *
                 * Where for specified alignment it's treated as an override comparing
                 * to the document default alignment, and we have to put list bullets/numbers
                 * inside list items, which looks reasonable for centered and "opposite" alignments.
                 */
                'editor-v4-list-element--align-inherit': element.align === undefined,
                'editor-v4-list-element--align-left': element.align === Alignment.LEFT,
                'editor-v4-list-element--align-center': element.align === Alignment.CENTER,
                'editor-v4-list-element--align-right': element.align === Alignment.RIGHT,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </List>
    );
};
