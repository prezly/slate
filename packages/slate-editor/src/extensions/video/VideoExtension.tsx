import type { OEmbedInfo } from '@prezly/sdk';
import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import React from 'react';

import type { InfoText } from '#components';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { VideoElement } from './components';
import { normalizeRedundantVideoAttributes, parseSerializedElement } from './lib';

export interface VideoExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    info?: InfoText.StructuredContent;
    mode?: 'iframe' | 'thumbnail';
    withMenu?: boolean;
    withLayoutControls?: boolean;
    withConversionOptions?: boolean;
}

export const EXTENSION_ID = 'VideoExtension';

export function VideoExtension({
    info,
    mode = 'thumbnail',
    withMenu = false,
    withLayoutControls = true,
    withConversionOptions = false,
}: VideoExtensionParameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [VideoNode.TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual: (node, another) => {
            if (VideoNode.isVideoNode(node) && VideoNode.isVideoNode(another)) {
                return (
                    node.url === another.url &&
                    node.layout === another.layout &&
                    isEqual(node.oembed, another.oembed)
                );
            }
            return undefined;
        },
        isRichBlock: VideoNode.isVideoNode,
        isVoid: VideoNode.isVideoNode,
        normalizeNode: normalizeRedundantVideoAttributes,
        renderElement: ({ attributes, children, element }) => {
            if (VideoNode.isVideoNode(element)) {
                return (
                    <VideoElement
                        info={info}
                        attributes={attributes}
                        element={element}
                        mode={mode}
                        withMenu={withMenu}
                        withLayoutControls={withLayoutControls}
                        withConversionOptions={withConversionOptions}
                    >
                        {children}
                    </VideoElement>
                );
            }

            return undefined;
        },
    });
}
