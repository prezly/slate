import type { QuoteNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { ElementType } from '../../types';

import './BlockQuoteElement.scss';

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
}) => (
    <blockquote
        {...attributes}
        {...props}
        className={classNames('editor-v4-block-quote-element', className)}
        data-slate-type={ElementType.BLOCK_QUOTE}
        data-slate-value={JSON.stringify(element)}
        style={{ textAlign: element.align }}
    >
        {children}
    </blockquote>
);
