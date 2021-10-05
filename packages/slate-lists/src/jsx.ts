/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { ElementType } from './test-utils';

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
            'h-inline-element': {
                children?: ReactNode;
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

const jsx = createHyperscript({
    elements: {
        'h-element-with-no-type': {},
        'h-inline-element': { type: ElementType.INLINE_ELEMENT },
        'h-li': { type: ElementType.LIST_ITEM },
        'h-li-text': { type: ElementType.LIST_ITEM_TEXT },
        'h-ol': { type: ElementType.NUMBERED_LIST },
        'h-p': { type: PARAGRAPH_NODE_TYPE },
        'h-ul': { type: ElementType.BULLETED_LIST },
        'h-unwrappable-element': { type: ElementType.UNWRAPPABLE_ELEMENT },
    },
});

export default jsx;
