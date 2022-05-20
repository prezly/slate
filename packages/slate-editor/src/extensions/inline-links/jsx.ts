/* eslint-disable @typescript-eslint/no-namespace,@typescript-eslint/no-unused-vars */
import { LINK_NODE_TYPE, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { createEditor as createSlateEditor } from 'slate';
import { createHyperscript, createEditor as createEditorFactory } from 'slate-hyperscript';

import { createEditor } from '#modules/editor';

import { InlineLinksExtension } from './InlineLinksExtension';

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
        editor: createEditorFactory(() => createEditor(createSlateEditor(), () => extensions)),
    },
});
