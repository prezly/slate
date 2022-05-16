/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { isSelectionEmpty } from './isSelectionEmpty';

describe('isSelectionEmpty', () => {
    it('Returns "true" when no text is selected', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionEmpty(editor)).toBe(true);
    });

    it('Returns "false" when just whitespaces are selected', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem
                        <anchor /> <focus />
                        ipsum
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionEmpty(editor)).toBe(false);
    });

    it('Returns "true" when no text is selected', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem <anchor />
                        <focus /> ipsum
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionEmpty(editor)).toBe(true);
    });
});
