import type { OEmbedInfo } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { type RenderElementProps } from '@udecode/plate';
import React from 'react';

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

export const EmbedExtension = ({
    allowHtmlInjection,
    allowScreenshots,
    availableWidth,
    info,
    withMenu = false,
    withLayoutControls = true,
    withConversionOptions = false,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [EmbedNode.TYPE]: createDeserializeElement(parseSerializedElement),
        }),
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
