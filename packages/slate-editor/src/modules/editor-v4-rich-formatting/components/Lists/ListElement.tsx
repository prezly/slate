import type { ListNode } from '@prezly/slate-types';
import { Alignment, BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './Lists.module.scss';

interface Props extends HTMLAttributes<HTMLOListElement> {
    attributes?: RenderElementProps['attributes'];
    element: ListNode;
}

export function ListElement({ attributes, children, className, element, ...props }: Props) {
    const List = element.type === BULLETED_LIST_NODE_TYPE ? 'ul' : 'ol';

    return (
        <List
            {...attributes}
            {...props}
            className={classNames(className, styles.ListElement, {
                [styles.bulleted]: element.type === BULLETED_LIST_NODE_TYPE,
                [styles.numbered]: element.type === NUMBERED_LIST_NODE_TYPE,
                /*
                 * `inherit` is a fourth mode to inherit alignment from above.
                 * It is needed, as "inherit" presentation will have better (i.e. matching
                 * expectations) placement of the list bullets outside the text flow.
                 *
                 * Where for specified alignment it's treated as an override comparing
                 * to the document default alignment, and we have to put list bullets/numbers
                 * inside list items, which looks reasonable for centered and "opposite" alignments.
                 */
                [styles.alignInherit]: element.align === undefined,
                [styles.alignLeft]: element.align === Alignment.LEFT,
                [styles.alignCenter]: element.align === Alignment.CENTER,
                [styles.alignRight]: element.align === Alignment.RIGHT,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </List>
    );
}
