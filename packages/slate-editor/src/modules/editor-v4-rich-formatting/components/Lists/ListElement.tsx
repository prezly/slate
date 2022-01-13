import { BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { RichTextElementType } from '../../types';

interface Props extends HTMLAttributes<HTMLOListElement> {
    attributes?: RenderElementProps['attributes'];
    element: RichTextElementType;
}

export const ListElement: FunctionComponent<Props> = ({
    attributes,
    children,
    className,
    element,
    ...props
}) => {
    const List = element.type === BULLETED_LIST_NODE_TYPE ? 'ul' : 'ol';

    return (
        <List
            {...attributes}
            {...props}
            className={classNames(className, {
                'editor-v4-bulleted-list-element': element.type === BULLETED_LIST_NODE_TYPE,
                'editor-v4-numbered-list-element': element.type === NUMBERED_LIST_NODE_TYPE,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </List>
    );
};
