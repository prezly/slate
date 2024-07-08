import type { Alignment} from '@prezly/slate-types';
import { type ParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './ParagraphElement.module.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    attributes?: RenderElementProps['attributes'];
    defaultAlignment: Alignment;
    element: ParagraphNode;
}

export function ParagraphElement({ attributes, children, className, defaultAlignment, element, ...props }: Props) {
    const align = element.align || defaultAlignment;

    return (
        <p
            {...attributes}
            {...props}
            className={classNames(styles.ParagraphElement, className)}
            style={{ textAlign: align }}
        >
            {children}
        </p>
    );
}
