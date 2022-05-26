import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isEmbedNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EmbedElement } from './components';
import { EMBED_EXTENSION_ID, EMBED_TYPE } from './constants';
import { normalizeRedundantEmbedAttributes, parseSerializedElement } from './lib';
import type { EmbedExtensionConfiguration } from './types';

interface Parameters extends EmbedExtensionConfiguration {
    availableWidth: number;
}

export const EmbedExtension = ({ availableWidth, showAsScreenshot }: Parameters): Extension => ({
    id: EMBED_EXTENSION_ID,
    deserialize: {
        element: {
            [EMBED_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isEmbedNode,
    normalizers: [normalizeRedundantEmbedAttributes],
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
    rootTypes: [EMBED_TYPE],
    voidTypes: [EMBED_TYPE],
});
