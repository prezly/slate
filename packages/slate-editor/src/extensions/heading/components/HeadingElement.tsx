import { EditorCommands } from '@prezly/slate-commons';
import type { HeadingNode } from '@prezly/slate-types';
import { HeadingRole } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '@prezly/slate-types';
import { useEditorRef } from '@udecode/plate/react';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import styles from './HeadingElement.module.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    element: HeadingNode;
}

export const HeadingElement = forwardRef<HTMLHeadingElement, Props>(
    ({ children, className, element, ...props }, ref) => {
        const editor = useEditorRef();
        const Tag = element.type === HEADING_1_NODE_TYPE ? 'h3' : 'h4';

        const isHeadingOne = element.type === HEADING_1_NODE_TYPE;
        const isHeadingTwo = element.type === HEADING_2_NODE_TYPE;
        const isTitle = element.role === HeadingRole.TITLE;
        const isSubtitle = element.role === HeadingRole.SUBTITLE;

        let placeholder: string | undefined = undefined;

        if (isTitle && EditorCommands.isNodeEmpty(editor, element)) {
            placeholder = 'Add a title';
        }

        if (isSubtitle && EditorCommands.isNodeEmpty(editor, element)) {
            placeholder = 'Add a subtitle';
        }

        return (
            <Tag
                {...props}
                ref={ref}
                className={classNames(className, styles.HeadingElement, {
                    [styles.title]: isTitle,
                    [styles.subtitle]: isSubtitle,
                    [styles.headingOne]: !isTitle && isHeadingOne,
                    [styles.headingTwo]: !isSubtitle && isHeadingTwo,
                })}
                style={{ textAlign: element.align }}
                data-placeholder={placeholder}
                data-slate-heading-role={element.role}
            >
                {children}
            </Tag>
        );
    },
);

HeadingElement.displayName = 'HeadingElement';
