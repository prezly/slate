import type { HeadingNode } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import './HeadingElement.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    attributes?: RenderElementProps['attributes'];
    element: HeadingNode;
}

export const HeadingElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => {
    const Heading = element.type === HEADING_1_NODE_TYPE ? 'h3' : 'h4';
    return (
        <Heading
            {...attributes}
            {...props}
            className={classNames(className, 'editor-v4-heading-element', {
                'editor-v4-heading-element--heading-one': element.type === HEADING_1_NODE_TYPE,
                'editor-v4-heading-element--heading-two': element.type === HEADING_2_NODE_TYPE,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </Heading>
    );
};
