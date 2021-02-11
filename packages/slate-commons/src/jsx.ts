/* eslint-disable @typescript-eslint/no-namespace */

import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { PARAGRAPH_TYPE } from './constants';
import { INLINE_ELEMENT, INLINE_VOID_ELEMENT, VOID_ELEMENT } from './test-utils';

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
            'h-inline-element': {
                children?: ReactNode;
            };
            'h-inline-void-element': {
                children?: ReactNode;
            };
            'h-void-element': {
                children?: ReactNode;
            };
            'h-p': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-inline-element': { type: INLINE_ELEMENT },
        'h-inline-void-element': { type: INLINE_VOID_ELEMENT },
        'h-void-element': { type: VOID_ELEMENT },
        'h-p': { type: PARAGRAPH_TYPE },
    },
});

export default jsx;
