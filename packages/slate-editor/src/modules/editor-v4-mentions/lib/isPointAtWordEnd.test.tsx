/** @jsx jsx */

import type { Editor } from 'slate';
import { Range } from 'slate';

import { jsx } from '../jsx';

import isPointAtWordEnd from './isPointAtWordEnd';

describe('isPointAtWordEnd', () => {
    it('Returns "false" when point is at the beginning of a word', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                        lorem ipsum
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = isPointAtWordEnd(editor, { at });

        expect(result).toBe(false);
    });

    it('Returns "false" when point is in the middle of a word', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem
                        <cursor />
                        ipsum
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = isPointAtWordEnd(editor, { at });

        expect(result).toBe(false);
    });

    it('Returns "true" when point is at the end of a word', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem
                        <cursor /> ipsum
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = isPointAtWordEnd(editor, { at });

        expect(result).toBe(true);
    });
});
