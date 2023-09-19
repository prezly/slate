import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { isStoryBookmarkNode, STORY_BOOKMARK_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { StoryBookmarkElement } from './components';
import { normalizeRedundantStoryBookmarkAttributes, parseSerializedElement } from './lib';
import type { StoryBookmarkExtensionParameters } from './types';

export const EXTENSION_ID = 'StoryBookmarkExtension';

export function StoryBookmarkExtension(params: StoryBookmarkExtensionParameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [STORY_BOOKMARK_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual: (node, another) => {
            if (isStoryBookmarkNode(node) && isStoryBookmarkNode(another)) {
                return (
                    node.story.uuid === another.story.uuid &&
                    node.show_thumbnail === another.show_thumbnail &&
                    node.new_tab === another.new_tab &&
                    node.layout === another.layout
                );
            }
            return undefined;
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
    });
}
