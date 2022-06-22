import type { HeadingNode } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import styles from './HeadingElement.module.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    element: HeadingNode;
}

export const HeadingElement = forwardRef<HTMLHeadingElement, Props>(
    ({ children, className, element, ...props }, ref) => {
        const Heading = element.type === HEADING_1_NODE_TYPE ? 'h3' : 'h4';
        return (
            <Heading
                {...props}
                ref={ref}
                className={classNames(className, styles.HeadingElement, {
                    [styles.headingOne]: element.type === HEADING_1_NODE_TYPE,
                    [styles.headingTwo]: element.type === HEADING_2_NODE_TYPE,
                })}
                style={{ textAlign: element.align }}
            >
                {children}
            </Heading>
        );
    },
);

HeadingElement.displayName = 'HeadingElement';
