import { ParagraphNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { RenderElementProps } from 'slate-react';

import './ParagraphElement.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    attributes?: RenderElementProps['attributes'];
    element: ParagraphNode;
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
        data-slate-type={PARAGRAPH_NODE_TYPE}
        data-slate-value={JSON.stringify(element)}
    >
        {children}
    </p>
);

export default ParagraphElement;
