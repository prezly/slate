/* eslint-disable @typescript-eslint/no-namespace,@typescript-eslint/no-unused-vars */
import { LINK_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { createEditor as makeEditor } from 'slate';
import { createHyperscript, createEditor } from 'slate-hyperscript';

import { InlineLinksExtension } from './InlineLinksExtension';

import { createEditorV4 } from '#modules/editor-v4/createEditorV4';

// This allows tests to include Slate Nodes written in JSX without TypeScript complaining.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any; // eslint-disable-line
        }
    }
}

const extensions = [InlineLinksExtension()];

export const jsx = createHyperscript({
    elements: {
        link: { type: LINK_NODE_TYPE },
        paragraph: { type: PARAGRAPH_NODE_TYPE },
    },
    creators: {
        editor: createEditor(() => createEditorV4(makeEditor(), () => extensions)),
    },
});
