import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes, Ref } from 'react';
import React, { forwardRef } from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { NewParagraphDelimiter } from '#components';

import styles from './CalloutElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    element: CalloutNode;
}

export const CalloutElement = forwardRef(
    ({ children, className, element, ...props }: Props, ref: Ref<HTMLDivElement>) => {
        const editor = useSlateStatic();
        const align = element.align ?? Alignment.LEFT;
        const isEmpty = EditorCommands.isNodeEmpty(editor, element);
        const isSelected = useSelected();

        return (
            <div {...props} ref={ref} className={classNames(className, styles.CalloutElement)}>
                <NewParagraphDelimiter extendedHitArea element={element} position="top" />
                <div
                    className={classNames(className, styles.Callout, {
                        [styles.selected]: isSelected,
                        [styles.alignLeft]: align === Alignment.LEFT,
                        [styles.alignCenter]: align === Alignment.CENTER,
                        [styles.alignRight]: align === Alignment.RIGHT,
                    })}
                >
                    <button
                        className={classNames(styles.Icon, {
                            [styles.empty]: !element.icon,
                        })}
                        contentEditable={false}
                        title="Change icon"
                    >
                        {element.icon}
                    </button>
                    <p
                        data-placeholder="Write something here..."
                        className={classNames(styles.Content, className, {
                            [styles.empty]: isEmpty,
                            [styles.alignLeft]: align === Alignment.LEFT,
                            [styles.alignCenter]: align === Alignment.CENTER,
                            [styles.alignRight]: align === Alignment.RIGHT,
                        })}
                    >
                        {children}
                    </p>
                </div>
                <NewParagraphDelimiter extendedHitArea element={element} position="bottom" />
            </div>
        );
    },
);

CalloutElement.displayName = 'CalloutElement';
