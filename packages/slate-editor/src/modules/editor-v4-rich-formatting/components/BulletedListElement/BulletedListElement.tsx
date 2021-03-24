import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ElementType, RichTextElementType } from '../../types';

import './BulletedListElement.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

const BulletedListElement: FunctionComponent<Props> = ({
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

export default BulletedListElement;
