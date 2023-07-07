/** @jsx hyperscript */

import { EditorCommands } from '@prezly/slate-commons';
import fs from 'fs';
import path from 'path';
import { Editor } from 'slate';

import { createDataTransfer } from '#lib';

import { hyperscript } from './hyperscript';
import { insertDivider } from './lib';
import { createEditor } from './test-utils';

function readTestFile(filepath: string): string {
    return fs.readFileSync(path.resolve(__dirname, '__tests__', filepath), 'utf-8');
}

describe('Editor', () => {
    describe('deleteForward()', () => {
        it('should focus the list after the paragraph when using deleteForward (Del key) ', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                    <h-ul>
                        <h-li>
                            <h-li-text>
                                <h-text>lorem ipsum</h-text>
                            </h-li-text>
                        </h-li>
                    </h-ul>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-ul>
                        <h-li>
                            <h-li-text>
                                <h-text>
                                    <cursor />
                                    lorem ipsum
                                </h-text>
                            </h-li-text>
                        </h-li>
                    </h-ul>
                </editor>
            ) as unknown as Editor;

            editor.deleteForward('character'); // equivalent to pressing delete (fn+backspace on macs)

            expect(() => {
                // In other extensions we modify the behavior of `deleteForward`, which in the past
                // caused the editor to be left with an invalid selection (pointing to non-leaf nodes).
                // Calling `Editor.marks` afterwards would throw an error:
                // "Cannot get the leaf node at path [${path}] because it refers to a non-leaf node: ${node}"
                // see: https://app.clubhouse.io/prezly/story/19544/editor-crashes-when-pressing-del-in-an-empty-paragraph-before-a-list
                Editor.marks(editor);
            }).not.toThrow();

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });
    });

    describe('Insertion', () => {
        it('should insert block node after a list node (and not within the list)', () => {
            const editor = createEditor(
                <editor>
                    <h-ul>
                        <h-li>
                            <h-li-text>
                                <h-text>lorem ipsum</h-text>
                            </h-li-text>
                        </h-li>
                    </h-ul>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-ul>
                        <h-li>
                            <h-li-text>
                                <h-text>lorem ipsum</h-text>
                            </h-li-text>
                        </h-li>
                    </h-ul>
                    <h-divider>
                        <h-text />
                    </h-divider>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            insertDivider(editor);

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });
    });

    describe('Pasting', () => {
        it('should deserialize Google Docs reference document', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/google-docs-reference-document.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/google-docs-reference-document.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should deserialize Microsoft Word reference document', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/docx-reference-document.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/docx-reference-document.html'),
                'text/rtf': readTestFile('input/docx-reference-document.rtf'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should not merge sibling divs into p', function () {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/divs.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchSnapshot();
        });

        it('should deserialize paragraph nested in quote', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/paragraph-in-quote.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/paragraph-in-quote.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toEqual(JSON.parse(expected));
        });

        it('should deserialize image nested in paragraph', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/image-in-paragraph.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/image-in-paragraph.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should deserialize image nested in h1', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/image-in-h1.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/image-in-h1.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should deserialize list without throwing an error (normalizations count limit)', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/list-normalization-1.html'),
            });

            expect(() => {
                editor.insertData(dataTransfer);
            }).not.toThrow();
        });

        it('should deserialize custom Slack line-breaks', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/slack-line-breaks.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/slack-line-breaks.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should insert nodes with list nested in a paragraph', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const input = readTestFile('input/list-normalization-2.json');
            const expected = readTestFile('expected/list-normalization-2.json');

            EditorCommands.insertNodes(editor, JSON.parse(input));

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        /**
         * @see CARE-1320
         */
        it('should handle pasting nodes with empty children array', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const input = readTestFile('input/list-normalization-3.json');
            const expected = readTestFile('expected/list-normalization-3.json');

            EditorCommands.insertNodes(editor, JSON.parse(input), { mode: 'highest' });

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        /**
         * @see CARE-1965
         */
        it('should normalize list-items directly nested into another list-item', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const input = readTestFile('input/list-normalization-4.json');
            const expected = readTestFile('expected/list-normalization-4.json');

            editor.children = JSON.parse(input).children;

            Editor.normalize(editor, { force: true });

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        /**
         * @see CARE-1320
         */
        it('should handle nodes with empty children array', () => {
            const editor = createEditor(
                <editor>
                    <h-ol>
                        <h-li></h-li>
                    </h-ol>
                </editor>,
            );

            Editor.normalize(editor, { force: true });

            expect(editor.children).toMatchObject([
                {
                    type: 'numbered-list',
                    children: [
                        {
                            type: 'list-item',
                            children: [
                                {
                                    type: 'list-item-text',
                                    children: [{ text: '' }],
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it('should deserialize marks from style attributes', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/marks-in-style.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/marks-in-style.html'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should deserialize plaintext copied from PDF', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            <cursor />
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = readTestFile('expected/pdf-plaintext.json');
            const dataTransfer = createDataTransfer({
                'text/html': readTestFile('input/pdf-plaintext.html'),
                'text/plain': readTestFile('input/pdf-plaintext.txt'),
            });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchObject(JSON.parse(expected));
        });

        it('should preserve target block formatting when pasting a single text block', () => {
            const HTML = '<h1>Hello world</h1>';

            const editor = createEditor(
                <editor>
                    <h:blockquote>
                        <h:text>
                            <cursor />
                        </h:text>
                    </h:blockquote>
                </editor>,
            );

            const dataTransfer = createDataTransfer({ 'text/html': HTML });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchSnapshot();
        });

        it('should preserve source blocks formatting when pasting multiple text blocks', () => {
            const HTML = `
                 <h1>Hello world</h1>
                 <h2>This is it, a subtitle.</h2>
                 <p>How do you like it?</p>
            `;

            const editor = createEditor(
                <editor>
                    <h:blockquote>
                        <h:text>
                            <cursor />
                        </h:text>
                    </h:blockquote>
                </editor>,
            );

            const dataTransfer = createDataTransfer({ 'text/html': HTML });

            editor.insertData(dataTransfer);

            expect(editor.children).toMatchSnapshot();
        });
    });

    describe('withRootElements', () => {
        it('should lift up nested paragraphs', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                        <h-p>
                            <h-text>nested paragraph - text before</h-text>
                            <h-p>
                                <h-text>deeply nested paragraph</h-text>
                            </h-p>
                            <h-text>nested paragraph - text after</h-text>
                        </h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-p>
                        <h-text>nested paragraph - text before</h-text>
                    </h-p>
                    <h-p>
                        <h-text>deeply nested paragraph</h-text>
                    </h-p>
                    <h-p>
                        <h-text>nested paragraph - text after</h-text>
                    </h-p>
                    <h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            Editor.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });
    //
    describe('Voids', () => {
        it('should properly remove text from trailing paragraph', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-divider>
                        <h-text>
                            <anchor />
                        </h-text>
                    </h-divider>
                    <h-p>
                        <h-text>
                            text <focus />
                            after
                        </h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-p>
                        <h-text>
                            <cursor />
                            after
                        </h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            editor.deleteFragment();

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });

        it('should properly remove text from leading paragraph', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>
                            text <anchor />
                            before
                        </h-text>
                    </h-p>
                    <h-divider>
                        <h-text>
                            <focus />
                        </h-text>
                    </h-divider>
                    <h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-p>
                        <h-text>
                            text <cursor />
                        </h-text>
                    </h-p>
                    <h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            editor.deleteFragment();

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });

        it('should properly remove 2 consecutive void blocks after a paragraph', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-divider>
                        <h-text>
                            <anchor />
                        </h-text>
                    </h-divider>
                    <h-divider>
                        <h-text>
                            <focus />
                        </h-text>
                    </h-divider>
                    <h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-p>
                        <h-text>
                            <cursor />
                            text after
                        </h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            editor.deleteFragment();

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });

        it('should properly remove 2 consecutive void blocks after 2 paragraphs', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>text before 1</h-text>
                    </h-p>
                    <h-p>
                        <h-text>text before 2</h-text>
                    </h-p>
                    <h-divider>
                        <h-text>
                            <anchor />
                        </h-text>
                    </h-divider>
                    <h-divider>
                        <h-text>
                            <focus />
                        </h-text>
                    </h-divider>
                    <h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-p>
                        <h-text>text before 1</h-text>
                    </h-p>
                    <h-p>
                        <h-text>text before 2</h-text>
                    </h-p>
                    <h-p>
                        <h-text>
                            <cursor />
                            text after
                        </h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            editor.deleteFragment();

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });

        it('should properly remove 4 consecutive void blocks', () => {
            const editor = createEditor(
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-divider>
                        <h-text>
                            <anchor />
                        </h-text>
                    </h-divider>
                    <h-divider>
                        <h-text />
                    </h-divider>
                    <h-divider>
                        <h-text />
                    </h-divider>
                    <h-divider>
                        <h-text>
                            <focus />
                        </h-text>
                    </h-divider>
                    <h-p>
                        <h-text>text after</h-text>
                    </h-p>
                </editor>,
            );

            const expected = (
                <editor>
                    <h-p>
                        <h-text>text before</h-text>
                    </h-p>
                    <h-p>
                        <h-text>
                            <cursor />
                            text after
                        </h-text>
                    </h-p>
                </editor>
            ) as unknown as Editor;

            editor.deleteFragment();

            expect(editor.children).toEqual(expected.children);
            expect(editor.selection).toEqual(expected.selection);
        });
    });
});
