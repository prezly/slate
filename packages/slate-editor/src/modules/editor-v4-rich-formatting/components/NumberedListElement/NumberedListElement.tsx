import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';
import { ElementType } from '../../types';

import './NumberedListElement.scss';

interface Props extends HTMLAttributes<HTMLOListElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const NumberedListElement: FunctionComponent<Props> = ({
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

