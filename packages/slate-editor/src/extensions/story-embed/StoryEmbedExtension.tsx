import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { STORY_EMBED_NODE_TYPE, isStoryEmbedNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { StoryEmbedElement } from './components';
import { STORY_EMBED_EXTENSION_ID } from './constants';
import { normalizeRedundantStoryEmbedAttributes, parseSerializedElement } from './lib';
import type { StoryEmbedExtensionParameters } from './types';

export const StoryEmbedExtension = ({ render }: StoryEmbedExtensionParameters): Extension => ({
    id: STORY_EMBED_EXTENSION_ID,
    deserialize: {
        element: {
            [STORY_EMBED_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isStoryEmbedNode,
    normalizers: [normalizeRedundantStoryEmbedAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isStoryEmbedNode(element)) {
            return (
                <>
                    <StoryEmbedElement attributes={attributes} element={element} render={render}>
                        {children}
                    </StoryEmbedElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [STORY_EMBED_NODE_TYPE],
    voidTypes: [STORY_EMBED_NODE_TYPE],
});
