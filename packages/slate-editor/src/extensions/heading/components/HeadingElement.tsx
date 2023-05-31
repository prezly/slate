import { EditorCommands } from '@prezly/slate-commons';
import type { HeadingNode } from '@prezly/slate-types';
import { HeadingRole } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import { useSlateStatic } from 'slate-react';

import styles from './HeadingElement.module.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    element: HeadingNode;
}

export const HeadingElement = forwardRef<HTMLHeadingElement, Props>(
    ({ children, className, element, ...props }, ref) => {
        const editor = useSlateStatic();
        const Heading = element.type === HEADING_1_NODE_TYPE ? 'h3' : 'h4';

        const isHeadingOne = element.type === HEADING_1_NODE_TYPE;
        const isHeadingTwo = element.type === HEADING_2_NODE_TYPE;
        const isTitle = element.role === HeadingRole.TITLE;
        const isSubtitle = element.role === HeadingRole.SUBTITLE;

        const finalClassNames = classNames(className, styles.HeadingElement, {
            [styles.title]: isTitle,
            [styles.subtitle]: isSubtitle,
            [styles.headingOne]: !isTitle && isHeadingOne,
            [styles.headingTwo]: !isSubtitle && isHeadingTwo,
        });

        if (isTitle && EditorCommands.isNodeEmpty(editor, element)) {
            return (
                <Heading {...props} ref={ref} className={finalClassNames}>
                    {children}
                    <span contentEditable={false} className={styles.placeholder}>Add a title</span>
                </Heading>
            );
        }

        if (isSubtitle && EditorCommands.isNodeEmpty(editor, element)) {
            return (
                <Heading {...props} ref={ref} className={finalClassNames}>
                    {children}
                    <span contentEditable={false} className={styles.placeholder}>Add a subtitle</span>
                </Heading>
            );
        }

        return (
            <Heading
                {...props}
                ref={ref}
                className={finalClassNames}
                style={{ textAlign: element.align }}
            >
                {children}
            </Heading>
        );
    },
);

HeadingElement.displayName = 'HeadingElement';
