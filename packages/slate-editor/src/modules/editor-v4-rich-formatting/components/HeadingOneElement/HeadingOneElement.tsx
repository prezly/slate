import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import * as React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';
import { ElementType } from '../../types';

import './HeadingOneElement.scss';

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
