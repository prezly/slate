import type { ListNode } from '@prezly/slate-types';
import { Alignment, BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes, Ref } from 'react';
import React, { forwardRef } from 'react';

import styles from './ListElement.module.scss';

interface Props extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
    element: ListNode;
}

export const ListElement = forwardRef<HTMLUListElement | HTMLOListElement, Props>(
    ({ children, className: customClassName, element, ...props }: Props, ref) => {
        const className = classNames(customClassName, styles.ListElement, {
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
        });

        if (element.type === BULLETED_LIST_NODE_TYPE) {
            return (
                <ul {...props} className={className} ref={ref as Ref<HTMLUListElement>}>
                    {children}
                </ul>
            );
        }

        return (
            <ol {...props} className={className} ref={ref as Ref<HTMLOListElement>}>
                {children}
            </ol>
        );
    },
);

ListElement.displayName = 'ListElement';
