/* eslint-disable @typescript-eslint/no-namespace */

import {
    LINK_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    MENTION_NODE_TYPE,
} from '@prezly/slate-types';
import type { ReactNode } from 'react';
import type { Editor } from 'slate';
import { createEditor, Element } from 'slate';
import {
    createEditor as createEditorFactory,
    createHyperscript,
    createText,
} from 'slate-hyperscript';

export const INLINE_ELEMENT = LINK_NODE_TYPE;
export const INLINE_VOID_ELEMENT = MENTION_NODE_TYPE;
export const VOID_ELEMENT = DIVIDER_NODE_TYPE;
export const SOME_ELEMENT_1 = HEADING_1_NODE_TYPE; // must be different than SOME_ELEMENT_2
export const SOME_ELEMENT_2 = HEADING_2_NODE_TYPE; // must be different than SOME_ELEMENT_1

declare global {
    namespace JSX {
        // TODO: find a way to not have to copy it and still have type hinting when using hyperscript.
        // See: https://github.com/prezly/slate/issues/6
        interface IntrinsicElements {
            anchor:
                | {
                      offset?: never;
                      path?: never;
                  }
                | {
                      offset: number;
                      path: number[];
                  };
            cursor: {
                children?: never;
            };
            editor: {
                withOverrides?: WithOverride[];
                children?: ReactNode;
            };
            element: {
                [key: string]: any;
                children?: ReactNode;
                type: string;
            };
            focus:
                | {
                      offset?: never;
                      path?: never;
                  }
                | {
                      offset: number;
                      path: number[];
                  };
            fragment: {
                children?: ReactNode;
            };
            selection: {
                children?: ReactNode;
            };
            // using 'h-text' instead of 'text' to avoid collision with React typings, see:
            // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0182cd9094aa081558a3c4bfc970bbdfb71d891d/types/react/index.d.ts#L3136
            'h-text': {
                [key: string]: any;
                children?: ReactNode;
            };
        }

        interface IntrinsicElements {
            // it's a "link" in our tests - because we have to pick something
            // but it could have been any other inline element
            'h-inline-element': {
                children?: ReactNode;
                href: string;
            };
            // it's a "link" in our tests - because we have to pick something
            // but it could have been any other inline void element
            'h-inline-void-element': {
                children?: ReactNode;
                href: string;
            };
            'h-link': {
                children?: ReactNode;
                href: string;
            };
            // it's a "divider" in our tests - because we have to pick something
            // but it could have been any other void element
            'h-void-element': {
                children?: ReactNode;
            };
            'h-p': {
                children?: ReactNode;
            };
            // it could have been any other block element
            'h-some-element-1': {
                children?: ReactNode;
            };
            'h-some-element-2': {
                children?: ReactNode;
            };
        }
    }
}

type WithOverride = <T extends Editor>(editor: T) => T;

const DEFAULT_OVERRIDES: WithOverride[] = [withVoidNodes, withInlineNodes];

export const jsx = createHyperscript({
    elements: {
        'h-inline-element': { type: LINK_NODE_TYPE },
        'h-inline-void-element': { type: INLINE_VOID_ELEMENT },
        'h-link': { type: LINK_NODE_TYPE },
        'h-void-element': { type: VOID_ELEMENT },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-some-element-1': { type: SOME_ELEMENT_1 },
        'h-some-element-2': { type: SOME_ELEMENT_2 },
    },
    creators: {
        'h-text': createText,
        editor: function (tagName, attributes, children) {
            const { withOverrides = [], ...rest } = attributes;

            const factory = createEditorFactory(function () {
                return [...DEFAULT_OVERRIDES, ...withOverrides].reduce(
                    (editor, withOverride) => withOverride(editor),
                    createEditor(),
                );
            });

            return factory(tagName, rest, children);
        },
    },
});

function withInlineNodes<T extends Editor>(editor: T): T {
    const { isInline } = editor;

    editor.isInline = function (element) {
        return (
            Element.isElementType(element, INLINE_ELEMENT) ||
            Element.isElementType(element, INLINE_VOID_ELEMENT) ||
            isInline(element)
        );
    };

    return editor;
}

function withVoidNodes<T extends Editor>(editor: T): T {
    const { isVoid } = editor;

    editor.isVoid = function (element) {
        return (
            Element.isElementType(element, VOID_ELEMENT) ||
            Element.isElementType(element, INLINE_VOID_ELEMENT) ||
            isVoid(element)
        );
    };

    return editor;
}
