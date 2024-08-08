import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import { isLinkNode, LINK_NODE_TYPE } from '@prezly/slate-types';
import { flow } from '@technically/lodash';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { withPastedContentAutolinking, withSelectionAutolinking } from './behaviour';
import { LinkElement } from './components';
import {
    escapeLinksBoundaries,
    normalizeEmptyLink,
    normalizeNestedLink,
    normalizeRedundantLinkAttributes,
    parseSerializedLinkElement,
} from './lib';
import type { InlineLinksExtensionConfiguration } from './types';

export const EXTENSION_ID = 'InlineLinksExtension';

export const InlineLinksExtension = ({
    predefinedLinks,
}: InlineLinksExtensionConfiguration): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [LINK_NODE_TYPE]: createDeserializeElement(parseSerializedLinkElement),
            A: (element: HTMLElement): Omit<LinkNode, 'children'> | undefined => {
                if (element instanceof HTMLAnchorElement && element.textContent) {
                    return {
                        type: LINK_NODE_TYPE,
                        href: element.href,
                        new_tab: Boolean(element.getAttribute('target')),
                    };
                }

                return undefined;
            },
        }),
    },
    isInline: isLinkNode,
    normalizeNode: [normalizeEmptyLink, normalizeNestedLink, normalizeRedundantLinkAttributes],
    onKeyDown: function (event, editor) {
        escapeLinksBoundaries(event, editor);
    },
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isLinkNode(element)) {
            return (
                <LinkElement
                    attributes={attributes}
                    element={element}
                    predefinedLinks={predefinedLinks}
                >
                    {children}
                </LinkElement>
            );
        }

        return undefined;
    },
    withOverrides: (editor) =>
        flow([withPastedContentAutolinking, withSelectionAutolinking])(editor),
});
