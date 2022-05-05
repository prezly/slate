import type { QuoteNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ElementType } from '../../types';

import './BlockQuoteElement.scss';
import { Node } from 'slate';

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
    const align = element.align ?? Alignment.LEFT;
    const isEmpty = Node.string(element).length === 0;

    return (
        <blockquote
            {...attributes}
            {...props}
            className={classNames('editor-v4-block-quote-element', className, {
                ['editor-v4-block-quote-element--alignLeft']: align === Alignment.LEFT,
                ['editor-v4-block-quote-element--alignCenter']: align === Alignment.CENTER,
                ['editor-v4-block-quote-element--alignRight']: align === Alignment.RIGHT,
            })}
            data-slate-type={ElementType.BLOCK_QUOTE}
            data-slate-value={JSON.stringify(element)}
        >
            <p
                data-placeholder={isEmpty ? 'Quote' : undefined}
                className={classNames('editor-v4-block-quote-element__paragraph', className, {
                    ['editor-v4-block-quote-element__paragraph--alignLeft']:
                        align === Alignment.LEFT,
                    ['editor-v4-block-quote-element__paragraph--alignCenter']:
                        align === Alignment.CENTER,
                    ['editor-v4-block-quote-element__paragraph--alignRight']:
                        align === Alignment.RIGHT,
                })}
            >
                {children}
            </p>
        </blockquote>
    );
};
