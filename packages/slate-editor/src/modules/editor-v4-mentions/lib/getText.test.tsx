/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import getText from './getText';

describe('getText', () => {
    it('Returns an empty string when "at" is "null"', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        expect(getText(editor, null)).toEqual('');
    });

    it('Returns selected text', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem
                        <anchor />
                        ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        expect(getText(editor, editor.selection)).toEqual('ipsum');
    });
});
