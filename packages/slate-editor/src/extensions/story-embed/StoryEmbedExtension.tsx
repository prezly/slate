import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { STORY_EMBED_NODE_TYPE, isStoryEmbedNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { StoryEmbedElement } from './components';
import { normalizeRedundantStoryEmbedAttributes, parseSerializedElement } from './lib';
import type { StoryEmbedExtensionParameters } from './types';

export const EXTENSION_ID = 'StoryEmbedExtension';

export const StoryEmbedExtension = ({ render }: StoryEmbedExtensionParameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [STORY_EMBED_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isRichBlock: isStoryEmbedNode,
    isVoid: isStoryEmbedNode,
    normalizeNode: normalizeRedundantStoryEmbedAttributes,
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
});
