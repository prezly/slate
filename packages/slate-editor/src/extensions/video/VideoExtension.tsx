import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isVideoNode, VIDEO_NODE_TYPE } from '@prezly/slate-types';
import { isEqual } from 'lodash-es';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { VideoElement } from './components';
import { normalizeRedundantVideoAttributes, parseSerializedElement } from './lib';
import type { VideoExtensionParameters } from './types';

export const EXTENSION_ID = 'VideoExtension';

export function VideoExtension({ mode = 'thumbnail' }: VideoExtensionParameters): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [VIDEO_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual: (node, another) => {
            if (isVideoNode(node) && isVideoNode(another)) {
                return node.url === another.url && isEqual(node.oembed, another.oembed);
            }
            return undefined;
        },
        isRichBlock: isVideoNode,
        isVoid: isVideoNode,
        normalizeNode: normalizeRedundantVideoAttributes,
        renderElement: ({ attributes, children, element }) => {
            if (isVideoNode(element)) {
                return (
                    <VideoElement attributes={attributes} element={element} mode={mode}>
                        {children}
                    </VideoElement>
                );
            }

            return undefined;
        },
    };
}
