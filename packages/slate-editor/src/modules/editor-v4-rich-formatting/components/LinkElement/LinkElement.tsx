import type { LinkNode } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { LinkWithTooltip } from '../../../../modules/editor-v4-components';

import './LinkElement.scss';

interface Props extends RenderElementProps {
    element: LinkNode;
}

const LinkElement: FunctionComponent<Props> = ({ attributes, children, element }) => (
    // Using a wrapping `span` to avoid a rare Slate bug which occurs as
    // a failed `ReactEditor.toSlateNode` in Slate's Editable onClick handler.
    // For more details, see https://github.com/prezly/prezly/pull/8016#discussion_r454190469
    <span {...attributes} data-slate-type={element.type} data-slate-value={JSON.stringify(element)}>
        <LinkWithTooltip href={element.href}>
            {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                <a
                    {...ariaAttributes}
                    className="editor-v4-link-element"
                    href={element.href}
                    onBlur={onHide}
                    onFocus={onShow}
                    onMouseEnter={onShow}
                    onMouseLeave={onHide}
                    ref={setReferenceElement}
                >
                    {children}
                </a>
            )}
        </LinkWithTooltip>
    </span>
);

export default LinkElement;
