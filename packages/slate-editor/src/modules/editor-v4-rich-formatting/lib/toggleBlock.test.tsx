/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';
import { ElementType } from '../types';

import toggleBlock from './toggleBlock';

describe('toggleBlock', () => {
    it('Toggles h1 into h2', () => {
        const editor = (
            <editor>
                <h-h1>
                    <h-text>first heading</h-text>
                    <cursor />
                </h-h1>
                <h-h1>
                    <h-text>second heading</h-text>
                </h-h1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-h2>
                    <h-text>first heading</h-text>
                    <cursor />
                </h-h2>
                <h-h1>
                    <h-text>second heading</h-text>
                </h-h1>
            </editor>
        ) as unknown as Editor;

        toggleBlock(editor, ElementType.HEADING_TWO);

        expect(editor.children).toEqual(expected.children);
    });
});
