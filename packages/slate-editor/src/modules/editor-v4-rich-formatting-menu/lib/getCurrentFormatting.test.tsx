/** @jsx jsx */

import {
    BULLETED_LIST_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';

import { jsx } from '../jsx';
import { createRichFormattingEditor } from '../test-utils';

import { getCurrentFormatting } from './getCurrentFormatting';

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

        const blockType = getCurrentFormatting(editor);

        expect(blockType).toBe(QUOTE_NODE_TYPE);
    });

    it('Returns the list type if the focus is at list item', () => {
        const editorUl = createRichFormattingEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                text
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const editorOl = createRichFormattingEditor(
            <editor>
                <h-ol>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                text
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ol>
            </editor>,
        );

        expect(getCurrentFormatting(editorUl)).toBe(BULLETED_LIST_NODE_TYPE);
        expect(getCurrentFormatting(editorOl)).toBe(NUMBERED_LIST_NODE_TYPE);
    });

    it('Returns the inner-most list type when focused a nested list', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-ol>
                    <h-li>
                        <h-li-text>
                            <h-text>numbered list item</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        bulleted list item
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ol>
            </editor>,
        );

        expect(getCurrentFormatting(editor)).toBe(BULLETED_LIST_NODE_TYPE);
    });

    it('Returns multiple when selection spans across different list types', () => {
        const editor = createRichFormattingEditor(
            <editor>
                <h-ol>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                <anchor />
                                numbered list item
                            </h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text />
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        bulleted list item
                                        <focus />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ol>
            </editor>,
        );

        expect(getCurrentFormatting(editor)).toBe('multiple');
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

        expect(getCurrentFormatting(editor)).toBe('multiple');
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

        expect(getCurrentFormatting(editor)).toBe(HEADING_1_NODE_TYPE);
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

        expect(getCurrentFormatting(editor)).toBe(HEADING_1_NODE_TYPE);
    });
});
