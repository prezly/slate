/** @jsx jsx */

import type { Editor } from 'slate';

import jsx from '../jsx';

import isEmpty from './isEmpty';

describe('isEmpty', () => {
    it('Considers editor to be empty when there are no nodes inside', () => {
        const editor = ((<editor />) as unknown) as Editor;

        expect(isEmpty(editor)).toBe(true);
    });

    it('Considers editor to be empty when it has only one empty block node', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isEmpty(editor)).toBe(true);
    });

    it('Considers editor to not be empty when it has multiple empty block nodes', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text />
                </h-p>
                <h-p>
                    <h-text />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isEmpty(editor)).toBe(false);
    });

    it('Considers editor to not be empty when it has only one block node with whitespace', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text> </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isEmpty(editor)).toBe(false);
    });
    it('Considers editor to not be empty when it has text in it', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isEmpty(editor)).toBe(false);
    });
});
