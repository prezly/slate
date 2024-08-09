import { EditorCommands } from '@prezly/slate-commons';
import type { QuoteNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes, Ref } from 'react';
import React, { forwardRef } from 'react';
import { useSlateStatic } from 'slate-react';

import { NewParagraphDelimiter } from '#components';

import styles from './BlockQuoteElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    element: QuoteNode;
}

export const BlockQuoteElement = forwardRef(
    ({ children, className, element, ...props }: Props, ref: Ref<HTMLDivElement>) => {
        const editor = useSlateStatic();
        const align = element.align ?? Alignment.LEFT;
        const isEmpty = EditorCommands.isNodeEmpty(editor, element);

        return (
            <div
                {...props}
                ref={ref}
                className={classNames(className, styles.BlockQuoteElement)}
                data-slate-block-align={align}
            >
                <NewParagraphDelimiter extendedHitArea element={element} position="top" />
                <blockquote
                    className={classNames(className, styles.Quote, {
                        [styles.alignLeft]: align === Alignment.LEFT,
                        [styles.alignCenter]: align === Alignment.CENTER,
                        [styles.alignRight]: align === Alignment.RIGHT,
                    })}
                >
                    <p
                        data-placeholder="Quote"
                        className={classNames(styles.Content, className, {
                            [styles.empty]: isEmpty,
                            [styles.alignLeft]: align === Alignment.LEFT,
                            [styles.alignCenter]: align === Alignment.CENTER,
                            [styles.alignRight]: align === Alignment.RIGHT,
                        })}
                    >
                        {children}
                    </p>
                </blockquote>
                <NewParagraphDelimiter extendedHitArea element={element} position="bottom" />
            </div>
        );
    },
);

BlockQuoteElement.displayName = 'BlockQuoteElement';
