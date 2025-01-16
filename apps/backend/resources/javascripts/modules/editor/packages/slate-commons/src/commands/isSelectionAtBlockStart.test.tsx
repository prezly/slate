/** @jsx hyperscript */

import type { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { isSelectionAtBlockStart } from './isSelectionAtBlockStart';

describe('isSelectionAtBlockStart', () => {
    it('Returns true when the cursor is at the start of the block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        lorem ipsum
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockStart(editor)).toBe(true);
    });

    it('Returns true when the selection starts at the start of the block', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        <focus />
                        lorem ipsum
                        <anchor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockStart(editor)).toBe(true);
    });

    it('Returns true when the selection is at the start of text inside an inline element', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:link href="https://example.com">
                        <h:text>
                            <cursor />
                            lorem ipsum
                        </h:text>
                    </h:link>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockStart(editor)).toBe(true);
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
        expect(isSelectionAtBlockStart(editor)).toBe(false);
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

        expect(isSelectionAtBlockStart(editor)).toBe(false);
    });

    it('Returns false when there is no selection', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isSelectionAtBlockStart(editor)).toBe(false);
    });
});
