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

export {
    LINK_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    MENTION_NODE_TYPE,
};

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
            // using 'h:text' instead of 'text' to avoid collision with React typings, see:
            // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0182cd9094aa081558a3c4bfc970bbdfb71d891d/types/react/index.d.ts#L3136
            'h:text': {
                bold?: boolean;
                italic?: boolean;
                underlined?: boolean;
                children?: ReactNode;
            };
        }

        interface IntrinsicElements {
            // it could have been any other inline element
            'h:link': {
                children?: ReactNode;
                href: string;
            };
            // it could have been any other inline void element
            'h:mention': {
                children?: ReactNode;
                username: string;
            };
            // it could have been any other void element
            'h:divider': {
                children?: ReactNode;
            };
            'h:paragraph': {
                children?: ReactNode;
            };
            // it could have been any other block element
            'h:heading-1': {
                children?: ReactNode;
            };
            'h:heading-2': {
                children?: ReactNode;
            };
        }
    }
}

type WithOverride = <T extends Editor>(editor: T) => T;

const DEFAULT_OVERRIDES: WithOverride[] = [withVoidNodes, withInlineNodes];

export const hyperscript = createHyperscript({
    elements: {
        'h:link': { type: LINK_NODE_TYPE },
        'h:mention': { type: MENTION_NODE_TYPE },
        'h:divider': { type: DIVIDER_NODE_TYPE },
        'h:paragraph': { type: PARAGRAPH_NODE_TYPE },
        'h:heading-1': { type: HEADING_1_NODE_TYPE },
        'h:heading-2': { type: HEADING_2_NODE_TYPE },
    },
    creators: {
        'h:text': createText,
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
            Element.isElementType(element, LINK_NODE_TYPE) ||
            Element.isElementType(element, MENTION_NODE_TYPE) ||
            isInline(element)
        );
    };

    return editor;
}

function withVoidNodes<T extends Editor>(editor: T): T {
    const { isVoid } = editor;

    editor.isVoid = function (element) {
        return (
            Element.isElementType(element, DIVIDER_NODE_TYPE) ||
            Element.isElementType(element, MENTION_NODE_TYPE) ||
            isVoid(element)
        );
    };

    return editor;
}
