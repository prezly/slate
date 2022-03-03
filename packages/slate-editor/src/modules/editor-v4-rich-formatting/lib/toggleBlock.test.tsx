/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';
import { ElementType } from '../types';

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

        toggleBlock(editor, ElementType.HEADING_TWO);

        expect(editor.children).toEqual(expected.children);
    });
});
