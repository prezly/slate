import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ElementType, RichTextElementType } from '../../types';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const HeadingOneElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <h3
        {...attributes}
        {...props}
        className={classNames('editor-v4-heading-one-element', className)}
        data-slate-type={ElementType.HEADING_ONE}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </h3>
);

export default HeadingOneElement;
