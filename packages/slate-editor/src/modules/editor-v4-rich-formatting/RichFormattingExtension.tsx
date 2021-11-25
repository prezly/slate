import type { Extension } from '@prezly/slate-commons';
import { isLinkNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import * as React from 'react';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';

import { LinkCandidateElement, LinkElement, RichTextElement } from './components';
import { RICH_FORMATTING_EXTENSION_ID } from './constants';
import createDeserialize from './createDeserialize';
import createOnKeyDown from './createOnKeyDown';
import {
    isLinkCandidateElement,
    isRichTextElement,
    normalizeEmptyLink,
    normalizeNestedLink,
    normalizeRedundantRichTextAttributes,
} from './lib';
import type { RichFormattingExtensionParameters } from './types';
import { ElementType, MarkType } from './types';

const RichFormattingExtension = (parameters: RichFormattingExtensionParameters): Extension => ({
    deserialize: createDeserialize(parameters),
    id: RICH_FORMATTING_EXTENSION_ID,
    inlineTypes: parameters.links ? [ElementType.LINK_CANDIDATE, ElementType.LINK] : [],
    normalizers: [normalizeEmptyLink, normalizeNestedLink, normalizeRedundantRichTextAttributes],
    onKeyDown: createOnKeyDown(parameters),
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (parameters.blocks && isRichTextElement(element)) {
            return (
                <RichTextElement attributes={attributes} element={element}>
                    {children}
                </RichTextElement>
            );
        }

        if (parameters.links && isLinkCandidateElement(element)) {
            return (
                <LinkCandidateElement attributes={attributes} element={element}>
                    {children}
                </LinkCandidateElement>
            );
        }

        if (parameters.links && isLinkNode(element)) {
            return (
                <LinkElement attributes={attributes} element={element}>
                    {children}
                </LinkElement>
            );
        }

        return undefined;
    },
    renderLeaf: ({ attributes, children, leaf }: RenderLeafProps) => {
        let spanChildren = children;

        if (leaf[MarkType.BOLD]) {
            spanChildren = <strong>{spanChildren}</strong>;
        }

        if (leaf[MarkType.ITALIC]) {
            spanChildren = <em>{spanChildren}</em>;
        }

        if (leaf[MarkType.SUBSCRIPT]) {
            spanChildren = <sub>{spanChildren}</sub>;
        }

        if (leaf[MarkType.SUPERSCRIPT]) {
            spanChildren = <sup>{spanChildren}</sup>;
        }

        if (leaf[MarkType.UNDERLINED]) {
            spanChildren = <u>{spanChildren}</u>;
        }

        return <span {...attributes}>{spanChildren}</span>;
    },
    rootTypes: [
        PARAGRAPH_NODE_TYPE,
        ElementType.BLOCK_QUOTE,
        ElementType.HEADING_ONE,
        ElementType.HEADING_TWO,
    ],
});

export default RichFormattingExtension;
