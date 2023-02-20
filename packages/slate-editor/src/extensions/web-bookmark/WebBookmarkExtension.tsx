import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { BOOKMARK_NODE_TYPE, isBookmarkNode } from '@prezly/slate-types';
import { isEqual } from 'lodash-es';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { WebBookmarkElement } from './components';
import {
    normalizeRedundantWebBookmarkAttributes,
    normalizeUrlAttribute,
    parseSerializedElement,
} from './lib';

interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
}

export const EXTENSION_ID = 'WebBookmarkExtension';

export const WebBookmarkExtension = ({
    withNewTabOption = true,
}: WebBookmarkExtensionParameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [BOOKMARK_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isElementEqual: (node, another) => {
        if (isBookmarkNode(node) && isBookmarkNode(another)) {
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
    isRichBlock: isBookmarkNode,
    isVoid: isBookmarkNode,
    normalizeNode: [normalizeRedundantWebBookmarkAttributes, normalizeUrlAttribute],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isBookmarkNode(element)) {
            return (
                <>
                    <WebBookmarkElement
                        attributes={attributes}
                        element={element}
                        withNewTabOption={withNewTabOption}
                    >
                        {children}
                    </WebBookmarkElement>
                </>
            );
        }

        return undefined;
    },
});
