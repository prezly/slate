import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { BookmarkNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { WebBookmarkElement } from './components';
import {
    normalizeRedundantWebBookmarkAttributes,
    normalizeUrlAttribute,
    parseSerializedElement,
} from './lib';

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
    isElementEqual: (node, another) => {
        if (BookmarkNode.isBookmarkNode(node) && BookmarkNode.isBookmarkNode(another)) {
            // Compare ignoring `uuid` and `children`
            return (
                node.url === another.url &&
                node.show_thumbnail === another.show_thumbnail &&
                node.layout === another.layout &&
                node.new_tab === another.new_tab &&
                isEqual(node.oembed, another.oembed)
            );
        }
        return undefined;
    },
    isRichBlock: BookmarkNode.isBookmarkNode,
    isVoid: BookmarkNode.isBookmarkNode,
    normalizeNode: [normalizeRedundantWebBookmarkAttributes, normalizeUrlAttribute],
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
