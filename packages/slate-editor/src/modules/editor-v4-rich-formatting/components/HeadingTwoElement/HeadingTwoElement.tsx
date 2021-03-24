import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ElementType, RichTextElementType } from '../../types';

import './HeadingTwoElement.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const HeadingTwoElement: FunctionComponent<Props> = ({
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

export default HeadingTwoElement;
