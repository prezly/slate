/** @jsx jsx */

import jsx from '../jsx';
import { createEditor } from '../test-utils';

import isSelectionAtBlockEnd from './isSelectionAtBlockEnd';

describe('isSelectionAtBlockEnd', () => {
    it('Returns true when the cursor is at the end of the block', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockEnd(editor)).toBe(true);
    });

    it('Returns true when the selection ends at the end of the block', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        lorem ipsum
                        <focus />
                    </h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockEnd(editor)).toBe(true);
    });

    it('Returns true when the selection is at the end of text inside an inline element', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-inline-element>
                        <h-text>
                            lorem ipsum
                            <cursor />
                        </h-text>
                    </h-inline-element>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockEnd(editor)).toBe(true);
    });

    it('Returns false when the cursor is in the middle of text', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem
                        <cursor />
                    </h-text>
                    <h-text> ipsum</h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockEnd(editor)).toBe(false);
    });

    it('Returns false when there is another inline element after the cursor', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-inline-element>
                        <h-text>
                            lorem
                            <cursor />
                        </h-text>
                    </h-inline-element>
                    <h-inline-element>
                        <h-text>ipsum</h-text>
                    </h-inline-element>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockEnd(editor)).toBe(false);
    });

    it('Returns false when there is no selection', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockEnd(editor)).toBe(false);
    });
});
