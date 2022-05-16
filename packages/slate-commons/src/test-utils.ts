/* eslint-disable no-param-reassign */

import {
    DIVIDER_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    LINK_NODE_TYPE,
    MENTION_NODE_TYPE,
} from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Element } from 'slate';

export const INLINE_ELEMENT = LINK_NODE_TYPE;
export const INLINE_VOID_ELEMENT = MENTION_NODE_TYPE;
export const VOID_ELEMENT = DIVIDER_NODE_TYPE;
export const SOME_ELEMENT_1 = HEADING_1_NODE_TYPE; // must be different than SOME_ELEMENT_2
export const SOME_ELEMENT_2 = HEADING_2_NODE_TYPE; // must be different than SOME_ELEMENT_1

export function withGenericTestElements<T extends Editor>(editor: T): T {
    const { isInline, isVoid } = editor;

    editor.isInline = (element) =>
        Element.isElementType(element, INLINE_ELEMENT) ||
        Element.isElementType(element, INLINE_VOID_ELEMENT) ||
        isInline(element);

    editor.isVoid = (element) =>
        Element.isElementType(element, VOID_ELEMENT) ||
        Element.isElementType(element, INLINE_VOID_ELEMENT) ||
        isVoid(element);

    return editor;
}

export function createEditor(input: JSX.Element) {
    return withGenericTestElements(input as unknown as Editor);
}
