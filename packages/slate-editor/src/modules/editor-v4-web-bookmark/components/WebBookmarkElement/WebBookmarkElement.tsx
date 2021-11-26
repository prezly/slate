import type { BookmarkNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent} from 'react';
import React from 'react';
import type { RenderElementProps} from 'slate-react';
import { useSelected } from 'slate-react';

import './WebBookmarkElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: BookmarkNode;
}

export const WebBookmarkElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
}) => {
    const isSelected = useSelected();

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-embed-element', {
                'editor-v4-embed-element--active': isSelected,
                'editor-v4-embed-element--video': element.oembed.type === 'video',
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            <div contentEditable={false}>
                <div
                    className={classNames('editor-v4-embed-element__overlay', {
                        'editor-v4-embed-element__overlay--hidden': isSelected,
                    })}
                />
                <div className="editor-v4-embed-element__content">
                    // TODO: Implement this
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};
