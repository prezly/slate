import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isVideoNode, VIDEO_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { VideoElement } from './components';
import { normalizeRedundantVideoAttributes, parseSerializedElement } from './lib';

export const EXTENSION_ID = 'VideoExtension';

export function VideoExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [VIDEO_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isRichBlock: isVideoNode,
        isVoid: isVideoNode,
        normalizeNode: normalizeRedundantVideoAttributes,
        renderElement: ({ attributes, children, element }) => {
            if (isVideoNode(element)) {
                return (
                    <VideoElement attributes={attributes} element={element}>
                        {children}
                    </VideoElement>
                );
            }

            return undefined;
        },
        rootTypes: [VIDEO_NODE_TYPE],
    };
}
