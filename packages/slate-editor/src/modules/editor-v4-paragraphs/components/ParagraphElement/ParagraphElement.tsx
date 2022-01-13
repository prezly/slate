import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import './ParagraphElement.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    attributes?: RenderElementProps['attributes'];
    element: ParagraphNode;
}

export const ParagraphElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <p
        {...attributes}
        {...props}
        className={classNames('editor-v4-paragraph-element', className)}
        data-slate-type={PARAGRAPH_NODE_TYPE}
        data-slate-value={JSON.stringify(element)}
        style={{ textAlign: element.align }}
    >
        {children}
    </p>
);
