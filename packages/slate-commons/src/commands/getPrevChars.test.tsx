/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { getPrevChars } from './getPrevChars';

describe('getPrevChars', () => {
    it('loops left and returns last 2 text characters', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem ipsum <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const chars = getPrevChars(editor, 2);

        expect(chars).toBe('m ');
    });

    it('loops left until first void node', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    lorem ipsum<h:mention username="elvis"></h:mention>b
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const chars = getPrevChars(editor, 2);

        expect(chars).toBe('b');
    });
});
