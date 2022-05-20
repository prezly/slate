import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isVideoNode, VIDEO_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { VideoElement } from './components';
import { VIDEO_EXTENSION_ID } from './constants';
import { normalizeRedundantVideoAttributes, parseSerializedElement } from './lib';

export function VideoExtension(): Extension {
    return {
        deserialize: {
            element: {
                [VIDEO_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            },
        },
        id: VIDEO_EXTENSION_ID,
        normalizers: [normalizeRedundantVideoAttributes],
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
        voidTypes: [VIDEO_NODE_TYPE],
    };
}
