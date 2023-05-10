/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { isSelectionAtBlockEnd } from './isSelectionAtBlockEnd';

describe('isSelectionAtBlockEnd', () => {
    it('Returns true when the cursor is at the end of the block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem ipsum
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockEnd(editor)).toBe(true);
    });

    it('Returns true when the selection ends at the end of the block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockEnd(editor)).toBe(true);
    });

    it('Returns true when the selection is at the end of text inside an inline element', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:link href="https://example.com">
                        <h:text>
                            lorem ipsum
                            <cursor />
                        </h:text>
                    </h:link>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockEnd(editor)).toBe(true);
    });

    it('Returns false when the cursor is in the middle of text', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        lorem
                        <cursor />
                    </h:text>
                    <h:text> ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockEnd(editor)).toBe(false);
    });

    it('Returns false when there is another inline element after the cursor', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:link href="https://example.com">
                        <h:text>
                            lorem
                            <cursor />
                        </h:text>
                    </h:link>
                    <h:link href="https://example.com">
                        <h:text>ipsum</h:text>
                    </h:link>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockEnd(editor)).toBe(false);
    });

    it('Returns false when there is no selection', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockEnd(editor)).toBe(false);
    });
});
