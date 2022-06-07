/** @jsx jsx */

import {
    BULLETED_LIST_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import type { Editor } from 'slate';

import { jsx } from '../../../jsx';

import { getCurrentFormatting } from './getCurrentFormatting';

describe('getRichFormattingBlockNodeType', () => {
    it('Returns the type of element at the cursor', () => {
        const editor = (
            <editor>
                <blockquote>
                    <text>
                        quote
                        <cursor />
                    </text>
                </blockquote>
            </editor>
        ) as unknown as Editor;

        const blockType = getCurrentFormatting(editor);

        expect(blockType).toBe(QUOTE_NODE_TYPE);
    });

    it('Returns the list type if the focus is at list item', () => {
        const editorUl = (
            <editor>
                <ul>
                    <li>
                        <li-text>
                            <text>
                                text
                                <cursor />
                            </text>
                        </li-text>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        const editorOl = (
            <editor>
                <ol>
                    <li>
                        <li-text>
                            <text>
                                text
                                <cursor />
                            </text>
                        </li-text>
                    </li>
                </ol>
            </editor>
        ) as unknown as Editor;

        expect(getCurrentFormatting(editorUl)).toBe(BULLETED_LIST_NODE_TYPE);
        expect(getCurrentFormatting(editorOl)).toBe(NUMBERED_LIST_NODE_TYPE);
    });

    it('Returns the inner-most list type when focused a nested list', () => {
        const editor = (
            <editor>
                <ol>
                    <li>
                        <li-text>
                            <text>numbered list item</text>
                        </li-text>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <li-text>
                                    <text>
                                        bulleted list item
                                        <cursor />
                                    </text>
                                </li-text>
                            </li>
                        </ul>
                    </li>
                </ol>
            </editor>
        ) as unknown as Editor;

        expect(getCurrentFormatting(editor)).toBe(BULLETED_LIST_NODE_TYPE);
    });

    it('Returns multiple when selection spans across different list types', () => {
        const editor = (
            <editor>
                <ol>
                    <li>
                        <li-text>
                            <text>
                                <anchor />
                                numbered list item
                            </text>
                        </li-text>
                    </li>
                    <li>
                        <li-text>
                            <text />
                        </li-text>
                        <ul>
                            <li>
                                <li-text>
                                    <text>
                                        bulleted list item
                                        <focus />
                                    </text>
                                </li-text>
                            </li>
                        </ul>
                    </li>
                </ol>
            </editor>
        ) as unknown as Editor;

        expect(getCurrentFormatting(editor)).toBe('multiple');
    });

    it('Returns multiple when the selection spans across different types', () => {
        const editor = (
            <editor>
                <anchor />
                <h1>
                    <text>text</text>
                </h1>
                <paragraph>
                    <text>text</text>
                </paragraph>
                <focus />
            </editor>
        ) as unknown as Editor;

        expect(getCurrentFormatting(editor)).toBe('multiple');
    });

    it('Returns the element type when the selection spans across multiple block of the same type', () => {
        const editor = (
            <editor>
                <anchor />
                <h1>
                    <text>text</text>
                </h1>
                <h1>
                    <text>text</text>
                </h1>
                <focus />
            </editor>
        ) as unknown as Editor;

        expect(getCurrentFormatting(editor)).toBe(HEADING_1_NODE_TYPE);
    });

    it('Ignores the inline blocks', () => {
        const editor = (
            <editor>
                <anchor />
                <h1>
                    <link href="http://example.com">
                        <text>text</text>
                    </link>
                </h1>
                <focus />
            </editor>
        ) as unknown as Editor;

        expect(getCurrentFormatting(editor)).toBe(HEADING_1_NODE_TYPE);
    });
});
