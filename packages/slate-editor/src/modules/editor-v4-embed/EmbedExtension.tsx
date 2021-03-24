import { createDeserializeElement, Extension } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { EmbedElement, EmbedMenu } from './components';
import { EMBED_EXTENSION_ID, EMBED_TYPE } from './constants';
import { isEmbedElement, normalizeRedundantEmbedAttributes, parseSerializedElement } from './lib';
import { EmbedParameters } from './types';

const EmbedExtension = ({
    availableWidth,
    containerRef,
    showAsScreenshot,
}: EmbedParameters): Extension => ({
    deserialize: {
        element: {
            [EMBED_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: EMBED_EXTENSION_ID,
    normalizers: [normalizeRedundantEmbedAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isEmbedElement(element)) {
            return (
                <>
                    {attributes.ref.current && (
                        <EmbedMenu containerRef={containerRef} element={attributes.ref.current} />
                    )}
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

export default EmbedExtension;
