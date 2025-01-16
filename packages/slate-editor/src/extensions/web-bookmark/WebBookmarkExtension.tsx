import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { BookmarkNode } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { WebBookmarkElement } from './components';
import { parseSerializedElement } from './lib';
import { fixUuidCollisions, normalizeUrlAttribute, unsetUnknownAttributes } from './normalizations';

export interface Parameters {
    withNewTabOption?: boolean;
    withConversionOptions?: boolean;
}

export const EXTENSION_ID = 'WebBookmarkExtension';

export const WebBookmarkExtension = ({
    withNewTabOption = true,
    withConversionOptions = false,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [BookmarkNode.TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isRichBlock: BookmarkNode.isBookmarkNode,
    isVoid: BookmarkNode.isBookmarkNode,
    normalizeNode: [unsetUnknownAttributes, normalizeUrlAttribute, fixUuidCollisions],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (BookmarkNode.isBookmarkNode(element)) {
            return (
                <>
                    <WebBookmarkElement
                        attributes={attributes}
                        element={element}
                        withNewTabOption={withNewTabOption}
                        withConversionOptions={withConversionOptions}
                    >
                        {children}
                    </WebBookmarkElement>
                </>
            );
        }

        return undefined;
    },
});
