/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { toggleMark } from './toggleMark';

const EXAMPLE_MARK_1 = 'bold';

describe('toggleMark', () => {
    it('Adds the mark when it is inactive', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text {...{ [EXAMPLE_MARK_1]: true }}>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        toggleMark(editor, EXAMPLE_MARK_1);

        expect(editor.children).toEqual(expected.children);
    });

    it('Removes the mark when it is active', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text {...{ [EXAMPLE_MARK_1]: true }}>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        toggleMark(editor, EXAMPLE_MARK_1);

        expect(editor.children).toEqual(expected.children);
    });
});
