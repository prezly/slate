import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { HTML_NODE_TYPE, isHtmlNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { HtmlElement } from './components';
import { HTML_EXTENSION_ID } from './constants';
import { normalizeRedundantHtmlBlockAttributes, parseSerializedElement } from './lib';

export const HtmlExtension = (): Extension => ({
    deserialize: {
        element: {
            [HTML_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: HTML_EXTENSION_ID,
    isVoid: isHtmlNode,
    normalizers: [normalizeRedundantHtmlBlockAttributes],
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
