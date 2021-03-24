/** @jsx jsx */

import jsx from '../jsx';
import { createRichFormattingEditor } from '../test-utils';
import { ElementType } from '../types';

import getRichFormattingBlockNodeType from './getRichFormattingBlockNodeType';

describe('getRichFormattingBlockNodeType', () => {
    it('Returns the type of element at the cursor', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-blockquote>
                    <h-text>
                        quote
                        <cursor />
                    </h-text>
                </h-blockquote>
            </editor>,
        );

        const blockType = getRichFormattingBlockNodeType(editor);

        expect(blockType).toBe(ElementType.BLOCK_QUOTE);
    });

    it('Returns the list type if the focus is at list item', () => {
        const editorUl = createRichFormattingEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-text>
                            text
                            <cursor />
                        </h-text>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const editorOl = createRichFormattingEditor(
            <editor>
                <h-ol>
                    <h-li>
                        <h-text>
                            text
                            <cursor />
                        </h-text>
                    </h-li>
                </h-ol>
            </editor>,
        );

        expect(getRichFormattingBlockNodeType(editorUl)).toBe(ElementType.BULLETED_LIST);
        expect(getRichFormattingBlockNodeType(editorOl)).toBe(ElementType.NUMBERED_LIST);
    });

    it('Returns the inner-most list type when focused a nested list', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-ol>
                    <h-li>
                        <h-text>numbered list item</h-text>
                    </h-li>
                    <h-li>
                        <h-ul>
                            <h-li>
                                <h-text>
                                    bulleted list item
                                    <cursor />
                                </h-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ol>
            </editor>,
        );

        expect(getRichFormattingBlockNodeType(editor)).toBe(ElementType.BULLETED_LIST);
    });

    it('Returns multiple when selection spans across different list types', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-ol>
                    <anchor />
                    <h-li>
                        <h-text>numbered list item</h-text>
                    </h-li>
                    <h-li>
                        <h-ul>
                            <h-li>
                                <h-text>
                                    bulleted list item
                                    <cursor />
                                </h-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <focus />
                </h-ol>
            </editor>,
        );

        expect(getRichFormattingBlockNodeType(editor)).toBe('multiple');
    });

    it('Returns multiple when the selection spans across different types', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <anchor />
                <h-h1>
                    <h-text>text</h-text>
                </h-h1>
                <h-p>
                    <h-text>text</h-text>
                </h-p>
                <focus />
            </editor>,
        );

        expect(getRichFormattingBlockNodeType(editor)).toBe('multiple');
    });

    it('Returns the element type when the selection spans across multiple block of the same type', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <anchor />
                <h-h1>
                    <h-text>text</h-text>
                </h-h1>
                <h-h1>
                    <h-text>text</h-text>
                </h-h1>
                <focus />
            </editor>,
        );

        expect(getRichFormattingBlockNodeType(editor)).toBe(ElementType.HEADING_ONE);
    });

    it('Ignores the inline blocks', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <anchor />
                <h-h1>
                    <h-a href="http://example.com">
                        <h-text>text</h-text>
                    </h-a>
                </h-h1>
                <focus />
            </editor>,
        );

        expect(getRichFormattingBlockNodeType(editor)).toBe(ElementType.HEADING_ONE);
    });
});
