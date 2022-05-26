import { EditorCommands } from '@prezly/slate-commons';
import type { QuoteNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import styles from './BlockQuoteElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    attributes?: RenderElementProps['attributes'];
    element: QuoteNode;
}

export const BlockQuoteElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => {
    const editor = useSlateStatic();
    const align = element.align ?? Alignment.LEFT;
    const isEmpty = EditorCommands.isNodeEmpty(editor, element);

    return (
        <div {...attributes} {...props} className={classNames(className, styles.BlockQuoteElement)}>
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
        </div>
    );
};
