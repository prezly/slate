/** @jsx hyperscript */

import { HEADING_2_NODE_TYPE } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

import { toggleBlock } from './toggleBlock';

describe('toggleBlock', () => {
    it('Toggles h1 into h2', () => {
        const editor = (
            <editor>
                <h1>
                    <text>first heading</text>
                    <cursor />
                </h1>
                <h1>
                    <text>second heading</text>
                </h1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h2>
                    <text>first heading</text>
                    <cursor />
                </h2>
                <h1>
                    <text>second heading</text>
                </h1>
            </editor>
        ) as unknown as Editor;

        toggleBlock(editor, HEADING_2_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
    });
});
