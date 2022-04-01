import type { StoryBookmarkNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import type { StoryBookmarkExtensionParameters } from '../../types';

interface Props extends RenderElementProps {
    element: StoryBookmarkNode;
    params: StoryBookmarkExtensionParameters;
}

export function StoryBookmarkElement({ attributes, children, element }: Props) {
    return (
        <EditorBlock
            {...attributes} // contains `ref`
            element={element}
            overlay="always"
            renderMenu={undefined}
            renderBlock={({ isSelected }) => (
                <div>
                    <div>StoryBookmark</div>
                    {isSelected && 'Selected'}
                </div>
            )}
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}
