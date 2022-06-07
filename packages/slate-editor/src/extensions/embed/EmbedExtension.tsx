import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { EMBED_NODE_TYPE, isEmbedNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { EmbedElement } from './components';
import { normalizeRedundantEmbedAttributes, parseSerializedElement } from './lib';
import type { EmbedExtensionConfiguration } from './types';

interface Parameters extends EmbedExtensionConfiguration {
    availableWidth: number;
}

export const EXTENSION_ID = 'EmbedExtension';

export const EmbedExtension = ({ availableWidth, showAsScreenshot }: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [EMBED_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isRichBlock: isEmbedNode,
    isVoid: isEmbedNode,
    normalizeNode: normalizeRedundantEmbedAttributes,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isEmbedNode(element)) {
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
    rootTypes: [EMBED_NODE_TYPE],
});
