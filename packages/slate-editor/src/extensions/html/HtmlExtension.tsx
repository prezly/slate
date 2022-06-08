import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { HTML_NODE_TYPE, isHtmlNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { HtmlElement } from './components';
import { normalizeRedundantHtmlBlockAttributes, parseSerializedElement } from './lib';

export const EXTENSION_ID = 'HtmlExtension';

export const HtmlExtension = (): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [HTML_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isVoid: isHtmlNode,
    normalizeNode: normalizeRedundantHtmlBlockAttributes,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isHtmlNode(element)) {
            return (
                <HtmlElement attributes={attributes} element={element}>
                    {children}
                </HtmlElement>
            );
        }

        return undefined;
    },
    rootTypes: [HTML_NODE_TYPE],
});
