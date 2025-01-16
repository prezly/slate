import { Alignment } from '@prezly/slate-types';
import { type ParagraphNode } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './ParagraphElement.module.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    attributes?: RenderElementProps['attributes'];
    defaultAlignment: Alignment;
    element: ParagraphNode;
}

export function ParagraphElement({
    attributes,
    children,
    className,
    defaultAlignment,
    element,
    ...props
}: Props) {
    const align = element.align || defaultAlignment;

    return (
        <p
            {...attributes}
            {...props}
            className={classNames(styles.ParagraphElement, className)}
            style={{ textAlign: getTextAlign(align) }}
        >
            {children}
        </p>
    );
}

function getTextAlign(align: Alignment) {
    if (align === Alignment.CENTER) {
        return 'center';
    }

    if (align === Alignment.RIGHT) {
        return 'end';
    }

    return 'start';
}
