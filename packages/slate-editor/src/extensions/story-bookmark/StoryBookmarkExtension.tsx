import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { STORY_BOOKMARK_NODE_TYPE, isStoryBookmarkNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { StoryBookmarkElement } from './components';
import { normalizeRedundantStoryBookmarkAttributes, parseSerializedElement } from './lib';
import type { StoryBookmarkExtensionParameters } from './types';

export const EXTENSION_ID = 'StoryBookmarkExtension';

export const StoryBookmarkExtension = (params: StoryBookmarkExtensionParameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: {
            [STORY_BOOKMARK_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isStoryBookmarkNode,
    isVoid: isStoryBookmarkNode,
    normalizeNode: normalizeRedundantStoryBookmarkAttributes,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isStoryBookmarkNode(element)) {
            return (
                <StoryBookmarkElement attributes={attributes} element={element} params={params}>
                    {children}
                </StoryBookmarkElement>
            );
        }

        return undefined;
    },
    rootTypes: [STORY_BOOKMARK_NODE_TYPE],
});
