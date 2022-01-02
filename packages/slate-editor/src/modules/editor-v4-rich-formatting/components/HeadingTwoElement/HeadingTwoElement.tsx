import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';
import { ElementType } from '../../types';

import './HeadingTwoElement.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const HeadingTwoElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <h4
        {...attributes}
        {...props}
        className={classNames('editor-v4-heading-two-element', className)}
        data-slate-type={ElementType.HEADING_TWO}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </h4>
);

