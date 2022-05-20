import type { HeadingNode } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import styles from './HeadingElement.module.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    attributes?: RenderElementProps['attributes'];
    element: HeadingNode;
}

export function HeadingElement({ attributes, children, className, element, ...props }: Props) {
    const Heading = element.type === HEADING_1_NODE_TYPE ? 'h3' : 'h4';
    return (
        <Heading
            {...attributes}
            {...props}
            className={classNames(className, styles.HeadingElement, {
                [styles.headingOne]: element.type === HEADING_1_NODE_TYPE,
                [styles.headingTwo]: element.type === HEADING_2_NODE_TYPE,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
            style={{ textAlign: element.align }}
        >
            {children}
        </Heading>
    );
}
