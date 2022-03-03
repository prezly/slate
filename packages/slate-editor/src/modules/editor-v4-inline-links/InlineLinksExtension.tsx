import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import { isLinkNode, LINK_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { LinkCandidateElement, LinkElement } from './components';
import {
    escapeLinksBoundaries,
    isLinkCandidateNode,
    normalizeEmptyLink,
    normalizeNestedLink,
    normalizeRedundantLinkAttributes,
    parseSerializedLinkElement,
} from './lib';
import { LINK_CANDIDATE_NODE_TYPE } from './types';

export const InlineLinksExtension = (): Extension => ({
    id: 'InlineLinksExtension',
    deserialize: {
        element: {
            [LINK_NODE_TYPE]: createDeserializeElement(parseSerializedLinkElement),
            A: (element: HTMLElement): Omit<LinkNode, 'children'> | undefined => {
                if (element instanceof HTMLAnchorElement && element.textContent) {
                    return {
                        type: LINK_NODE_TYPE,
                        href: element.href,
                    };
                }

                return undefined;
            },
        },
    },
    inlineTypes: [LINK_NODE_TYPE, LINK_CANDIDATE_NODE_TYPE],
    normalizers: [normalizeEmptyLink, normalizeNestedLink, normalizeRedundantLinkAttributes],
    onKeyDown: function (event, editor) {
        escapeLinksBoundaries(event, editor);
    },
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isLinkCandidateNode(element)) {
            return (
                <LinkCandidateElement attributes={attributes} element={element}>
                    {children}
                </LinkCandidateElement>
            );
        }

        if (isLinkNode(element)) {
            return (
                <LinkElement attributes={attributes} element={element}>
                    {children}
                </LinkElement>
            );
        }

        return undefined;
    },
});
