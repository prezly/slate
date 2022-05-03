/** @jsx jsx */

import type { BaseText, Editor } from 'slate';

import { jsx } from '../jsx';

import { toggleMark } from './toggleMark';

interface StyledText extends BaseText {
    bold?: boolean;
}

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
                    <h-text bold>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        toggleMark<StyledText>(editor, 'bold');

        expect(editor.children).toEqual(expected.children);
    });

    it('Removes the mark when it is active', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text bold>
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

        toggleMark<StyledText>(editor, 'bold');

        expect(editor.children).toEqual(expected.children);
    });
});
