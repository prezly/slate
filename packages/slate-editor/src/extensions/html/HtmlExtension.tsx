import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { HTML_NODE_TYPE, isHtmlNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { HtmlElement } from './components';
import { normalizeRedundantHtmlBlockAttributes, parseSerializedElement } from './lib';

export const EXTENSION_ID = 'HtmlExtension';

export function HtmlExtension() {
    return useRegisterExtension({
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
    });
}
