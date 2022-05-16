/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { getPrevChars } from './getPrevChars';

describe('getPrevChars', () => {
    it('loops left and returns last 2 text characters', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const chars = getPrevChars(editor, 2);

        expect(chars).toBe('m ');
    });

    it('loops left until first void node', () => {
        const editor = (
            <editor>
                <h-p>
                    lorem ipsum<h-mention username="elvis"></h-mention>b
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        const chars = getPrevChars(editor, 2);

        expect(chars).toBe('b');
    });
});
