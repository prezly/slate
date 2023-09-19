import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { isStoryEmbedNode, STORY_EMBED_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { StoryEmbedElement } from './components';
import { normalizeRedundantStoryEmbedAttributes, parseSerializedElement } from './lib';
import type { StoryEmbedExtensionParameters } from './types';

export const EXTENSION_ID = 'StoryEmbedExtension';

export function StoryEmbedExtension({ render }: StoryEmbedExtensionParameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [STORY_EMBED_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual: (node, another) => {
            if (isStoryEmbedNode(node) && isStoryEmbedNode(another)) {
                return (
                    node.story.uuid === another.story.uuid &&
                    node.appearance === another.appearance &&
                    node.position === another.position
                );
            }
            return undefined;
        },
        isRichBlock: isStoryEmbedNode,
        isVoid: isStoryEmbedNode,
        normalizeNode: normalizeRedundantStoryEmbedAttributes,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isStoryEmbedNode(element)) {
                return (
                    <>
                        <StoryEmbedElement
                            attributes={attributes}
                            element={element}
                            render={render}
                        >
                            {children}
                        </StoryEmbedElement>
                    </>
                );
            }

            return undefined;
        },
    });
}
