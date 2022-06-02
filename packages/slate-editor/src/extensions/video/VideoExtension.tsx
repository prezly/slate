import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isVideoNode, VIDEO_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { VideoElement } from './components';
import { VIDEO_EXTENSION_ID } from './constants';
import { normalizeRedundantVideoAttributes, parseSerializedElement } from './lib';

export function VideoExtension(): Extension {
    return {
        id: VIDEO_EXTENSION_ID,
        deserialize: {
            element: {
                [VIDEO_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            },
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
