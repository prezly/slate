import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ElementType, RichTextElementType } from '../../types';

import './NumberedListElement.scss';

interface Props extends HTMLAttributes<HTMLOListElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const NumberedListElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <ol
        {...attributes}
        {...props}
        className={classNames('editor-v4-numbered-list-element', className)}
        data-slate-type={ElementType.NUMBERED_LIST}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </ol>
);

export default NumberedListElement;
