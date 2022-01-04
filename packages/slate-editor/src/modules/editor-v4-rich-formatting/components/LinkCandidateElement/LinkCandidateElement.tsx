import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { LinkCandidateNode } from '../../../../modules/editor-v4-rich-formatting/types';

import './LinkCandidateElement.scss';

interface Props extends RenderElementProps {
    element: LinkCandidateNode;
}

export const LinkCandidateElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
}) => (
    <span
        {...attributes}
        className="editor-v4-link-candidate-element"
        data-slate-type={element.type}
        id={element.id}
    >
        {children}
    </span>
);
