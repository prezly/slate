import React, { FunctionComponent } from 'react';
import { RenderElementProps } from 'slate-react';

import { LinkCandidateElementType } from 'modules/editor-v4-rich-formatting/types';

import './LinkCandidateElement.scss';

interface Props extends RenderElementProps {
    element: LinkCandidateElementType;
}

const LinkCandidateElement: FunctionComponent<Props> = ({ attributes, children, element }) => (
    <span
        {...attributes}
        className="editor-v4-link-candidate-element"
        data-slate-type={element.type}
        id={element.id}
    >
        {children}
    </span>
);

export default LinkCandidateElement;
