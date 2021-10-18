/* eslint-disable no-param-reassign */

import { DIVIDER_NODE_TYPE, LINK_NODE_TYPE } from '@prezly/slate-types';
import { Editor } from 'slate';

export const INLINE_ELEMENT = LINK_NODE_TYPE;
export const INLINE_VOID_ELEMENT = LINK_NODE_TYPE;
export const VOID_ELEMENT = DIVIDER_NODE_TYPE;

const withGenericTestElements = <T extends Editor>(editor: T): T => {
    const { isInline, isVoid } = editor;

    editor.isInline = (element) =>
        [INLINE_ELEMENT, INLINE_VOID_ELEMENT].includes(element.type as string)
            ? true
            : isInline(element);

    editor.isVoid = (element) =>
        [VOID_ELEMENT, INLINE_VOID_ELEMENT].includes(element.type as string)
            ? true
            : isVoid(element);

    return editor;
};

export const createEditor = (input: JSX.Element) =>
    withGenericTestElements((input as unknown) as Editor);
