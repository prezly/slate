import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isVideoNode, VIDEO_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { VideoParameters } from './types';
import { VideoElement, VideoMenu } from './components';
import { VIDEO_EXTENSION_ID } from './constants';
import { normalizeRedundantVideoAttributes, parseSerializedElement } from './lib';

export const VideoExtension = ({ availableWidth, containerRef }: VideoParameters): Extension => ({
    deserialize: {
        element: {
            [VIDEO_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: VIDEO_EXTENSION_ID,
    normalizers: [normalizeRedundantVideoAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isVideoNode(element)) {
            return (
                <>
                    {attributes.ref.current && (
                        <VideoMenu containerRef={containerRef} element={attributes.ref.current} />
                    )}
                    <VideoElement
                        attributes={attributes}
                        availableWidth={availableWidth}
                        element={element}
                    >
                        {children}
                    </VideoElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [VIDEO_NODE_TYPE],
    voidTypes: [VIDEO_NODE_TYPE],
});
