import { EditorCommands } from '@prezly/slate-commons';
import type { QuoteNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import { Node } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { ElementType } from '../../types';

import styles from './BlockQuoteElement.module.scss';

interface Props extends HTMLAttributes<HTMLQuoteElement> {
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
    const isEmpty = !EditorCommands.hasVoidElements(editor, element) && Node.string(element) === '';

    return (
        <div>
            <blockquote
                {...attributes}
                {...props}
                className={classNames(className, styles.blockQuote, {
                    [styles.alignLeft]: align === Alignment.LEFT,
                    [styles.alignCenter]: align === Alignment.CENTER,
                    [styles.alignRight]: align === Alignment.RIGHT,
                })}
                data-slate-type={ElementType.BLOCK_QUOTE}
                data-slate-value={JSON.stringify(element)}
            >
                <p
                    data-placeholder={isEmpty ? 'Quote' : undefined}
                    className={classNames(styles.paragraph, className, {
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
