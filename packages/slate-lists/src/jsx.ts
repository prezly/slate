/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import {
    BULLETED_LIST_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
} from '@prezly/slate-types';
import type { ReactNode } from 'react';

import { INLINE_ELEMENT, UNWRAPPABLE_ELEMENT } from './test-utils';

declare global {
    namespace JSX {
        // This is copied from "packages/slate-hyperscript/src/index.ts"
        // TODO: find a way to not have to copy it and still have type hinting
        // when using hyperscript.
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
                [key: string]: any; // allow marks
                children?: ReactNode;
            };
        }

        interface IntrinsicElements {
            'h-element-with-no-type': {
                children?: ReactNode;
            };
            // it's a "link" in our tests - because we have to pick something
            // but it could have been any other inline element
            'h-inline-element': {
                children?: ReactNode;
                href: string;
            };
            'h-li': {
                children?: ReactNode;
            };
            'h-li-text': {
                children?: ReactNode;
            };
            'h-ol': {
                children?: ReactNode;
            };
            'h-p': {
                children?: ReactNode;
            };
            'h-ul': {
                children?: ReactNode;
            };
            'h-unwrappable-element': {
                children?: ReactNode;
            };
        }
    }
}

export const jsx = createHyperscript({
    elements: {
        'h-element-with-no-type': {},
        'h-inline-element': { type: INLINE_ELEMENT },
        'h-li': { type: LIST_ITEM_NODE_TYPE },
        'h-li-text': { type: LIST_ITEM_TEXT_NODE_TYPE },
        'h-ol': { type: NUMBERED_LIST_NODE_TYPE },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-ul': { type: BULLETED_LIST_NODE_TYPE },
        'h-unwrappable-element': { type: UNWRAPPABLE_ELEMENT },
    },
});
