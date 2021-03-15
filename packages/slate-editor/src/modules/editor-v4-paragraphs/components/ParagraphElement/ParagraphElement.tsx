import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import { ParagraphElementType } from '../../types';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    attributes?: RenderElementProps['attributes'];
    element: ParagraphElementType;
}

const ParagraphElement: FunctionComponent<Props> = ({
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
        data-slate-type={PARAGRAPH_TYPE}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </p>
);

export default ParagraphElement;
