import type { Extension } from '@prezly/slate-commons';
import { isPlaceholderNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import {
    convertVariableNodesToPlaceholders,
    parseSerializedElement,
    normalizeRedundantPlaceholderMentionAttributes,
} from './lib';

export const EXTENSION_ID = 'PlaceholderMentionsExtension';

export const PlaceholderMentionsExtension = (): Extension =>
    MentionsExtension({
        id: EXTENSION_ID,
        type: PLACEHOLDER_NODE_TYPE,
        normalizeNode: [
            convertVariableNodesToPlaceholders,
            normalizeRedundantPlaceholderMentionAttributes,
        ],
        parseSerializedElement,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isPlaceholderNode(element)) {
                return (
                    <MentionElement attributes={attributes} element={element}>
                        {`%${element.key}%`}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
    });
