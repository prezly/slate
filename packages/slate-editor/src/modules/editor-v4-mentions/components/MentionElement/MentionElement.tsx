import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { RenderElementProps, useSelected } from 'slate-react';

import { MentionElementType } from '../..';

import './MentionElement.scss';

interface Props extends RenderElementProps {
    element: MentionElementType;
}

const MentionElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const selected = useSelected();

    return (
        <span
            {...attributes}
            className={classNames('editor-v4-mention-element', {
                'editor-v4-mention-element--selected': selected,
            })}
            contentEditable={false}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            {children}
        </span>
    );
};

export default MentionElement;
