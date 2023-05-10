/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
    it('Considers editor to be empty when there are no nodes inside', () => {
        const editor = (<editor />) as unknown as Editor;

        expect(isEmpty(editor)).toBe(true);
    });

    it('Considers editor to be empty when it has only one empty block node', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isEmpty(editor)).toBe(true);
    });

    it('Considers editor to not be empty when it has multiple empty block nodes', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text />
                </h:paragraph>
                <h:paragraph>
                    <h:text />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isEmpty(editor)).toBe(false);
    });

    it('Considers editor to not be empty when it has only one block node with whitespace', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text> </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isEmpty(editor)).toBe(false);
    });
    it('Considers editor to not be empty when it has text in it', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isEmpty(editor)).toBe(false);
    });
});
