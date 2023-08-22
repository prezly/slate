import type { OEmbedInfo } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isEqual } from '@technically/lodash';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { EmbedElement } from './components';
import { EmbedNode } from './EmbedNode';
import { normalizeRedundantEmbedAttributes, parseSerializedElement } from './lib';

interface Parameters extends EmbedExtensionConfiguration {
    availableWidth: number;
}

export const EXTENSION_ID = 'EmbedExtension';

export interface EmbedExtensionConfiguration {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    showAsScreenshot: boolean;
}

export const EmbedExtension = ({ availableWidth, showAsScreenshot }: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [EmbedNode.TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isElementEqual: (node, another) => {
        if (EmbedNode.isEmbedNode(node) && EmbedNode.isEmbedNode(another)) {
            return node.url === another.url && isEqual(node.oembed, another.oembed);
        }
        return undefined;
    },
    isRichBlock: EmbedNode.isEmbedNode,
    isVoid: EmbedNode.isEmbedNode,
    normalizeNode: normalizeRedundantEmbedAttributes,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (EmbedNode.isEmbedNode(element)) {
            return (
                <>
                    <EmbedElement
                        attributes={attributes}
                        availableWidth={availableWidth}
                        element={element}
                        showAsScreenshot={showAsScreenshot}
                    >
                        {children}
                    </EmbedElement>
                </>
            );
        }

        return undefined;
    },
});
