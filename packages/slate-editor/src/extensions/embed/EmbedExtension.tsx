import type { OEmbedInfo } from '@prezly/sdk';
import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { isEqual } from '@technically/lodash';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { InfoText } from '#components';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { EmbedElement } from './components';
import { EmbedNode } from './EmbedNode';
import { parseSerializedElement } from './lib';
import { fixUuidCollisions, normalizeRedundantEmbedAttributes } from './normalizations';

interface Parameters extends EmbedExtensionConfiguration {
    availableWidth: number;
}

export const EXTENSION_ID = 'EmbedExtension';

export interface EmbedExtensionConfiguration {
    allowHtmlInjection?: boolean;
    allowScreenshots?: boolean;
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    info?: InfoText.StructuredContent;
    withMenu?: boolean;
    withLayoutControls?: boolean;
    withConversionOptions?: boolean;
}

export function EmbedExtension({
    allowHtmlInjection,
    allowScreenshots,
    availableWidth,
    info,
    withMenu = false,
    withLayoutControls = true,
    withConversionOptions = false,
}: Parameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [EmbedNode.TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual: (node, another) => {
            if (EmbedNode.isEmbedNode(node) && EmbedNode.isEmbedNode(another)) {
                return (
                    node.url === another.url &&
                    node.layout === another.layout &&
                    isEqual(node.oembed, another.oembed)
                );
            }
            return undefined;
        },
        isRichBlock: EmbedNode.isEmbedNode,
        isVoid: EmbedNode.isEmbedNode,
        normalizeNode: [fixUuidCollisions, normalizeRedundantEmbedAttributes],
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (EmbedNode.isEmbedNode(element)) {
                return (
                    <>
                        <EmbedElement
                            allowHtmlInjection={allowHtmlInjection}
                            allowScreenshots={allowScreenshots}
                            attributes={attributes}
                            availableWidth={availableWidth}
                            element={element}
                            info={info}
                            withMenu={withMenu}
                            withLayoutControls={withLayoutControls}
                            withConversionOptions={withConversionOptions}
                        >
                            {children}
                        </EmbedElement>
                    </>
                );
            }

            return undefined;
        },
    });
}
