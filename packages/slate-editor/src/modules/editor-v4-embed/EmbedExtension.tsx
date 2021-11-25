import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isEmbedNode } from '@prezly/slate-types';
import * as React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EmbedElement, EmbedMenu } from './components';
import { EMBED_EXTENSION_ID, EMBED_TYPE } from './constants';
import { normalizeRedundantEmbedAttributes, parseSerializedElement } from './lib';
import type { EmbedParameters } from './types';

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
        if (isEmbedNode(element)) {
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
