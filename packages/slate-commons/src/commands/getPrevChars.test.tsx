/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';
import { createEditor } from '../test-utils';

import { getPrevChars } from './getPrevChars';

describe('getPrevChars', () => {
    it('loops left and returns last 2 text characters', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum <cursor />
                    </h-text>
                </h-p>
            </editor>,
        ) as unknown as Editor;

        const chars = getPrevChars(editor, 2);

        expect(chars).toBe('m ');
    });

    it('loops left until first void node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    lorem ipsum<h-inline-void-element href="#"></h-inline-void-element>b
                    <cursor />
                </h-p>
            </editor>,
        ) as unknown as Editor;

        const chars = getPrevChars(editor, 2);

        expect(chars).toBe('b');
    });
});
