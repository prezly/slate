import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';
import { ElementType } from '../../types';

import './BulletedListElement.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const BulletedListElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => (
    <ul
        {...attributes}
        {...props}
        className={classNames('editor-v4-bulleted-list-element', className)}
        data-slate-type={ElementType.BULLETED_LIST}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </ul>
);
