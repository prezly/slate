import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { RenderElementProps, useSelected } from 'slate-react';

import { MentionElementType } from '../../types';

interface Props<T extends string> extends RenderElementProps {
    element: MentionElementType<T>;
}

const MentionElement = <T extends string>({
    attributes,
    children,
    element,
}: Props<T>): ReturnType<FunctionComponent<Props<T>>> => {
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
