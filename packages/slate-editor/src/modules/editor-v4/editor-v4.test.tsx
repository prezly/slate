/** @jsx jsx */

import { EditorCommands } from '@prezly/slate-commons';
import fs from 'fs';
import path from 'path';
import { Editor } from 'slate';

import jsx from './jsx';
import { createDataTransfer, insertDivider } from './lib';
import { createEditor } from './test-utils';

const readTestFile = (filepath: string): string => {
    const absoluteFilepath = path.resolve(__dirname, '__tests__', filepath);
    return fs.readFileSync(absoluteFilepath, 'utf-8');
};

describe('editor-v4 - deleteForward - selection maintenance', () => {
    it('Should focus the list after the paragraph when using deleteForward (Del key) ', () => {
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

        const expected = ((
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
        ) as unknown) as Editor;

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

describe('editor-v4 - inserting block nodes after lists', () => {
    it('Insterts block node after a list node (and not within the list)', () => {
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

        const expected = ((
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
        ) as unknown) as Editor;

        insertDivider(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('editor-v4 - pasting', () => {
    it('Deserializes Google Docs reference document', () => {
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

    it('Deserializes Microsoft Word reference document', () => {
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

    it('Does not merge sibling divs into p', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = readTestFile('expected/divs.json');
        const dataTransfer = createDataTransfer({
            'text/html': readTestFile('input/divs.html'),
        });

        editor.insertData(dataTransfer);

        expect(editor.children).toEqual(JSON.parse(expected));
    });

    it('Deserializes paragraph nested in quote', () => {
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

    it('Deserializes image nested in paragraph', () => {
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

    it('Deserializes image nested in h1', () => {
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

    it('Deserializes list without throwing an error (normalizations count limit)', () => {
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

    it('Deserializes custom Slack line-breaks', () => {
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

    it('Inserts nodes with list nested in a paragraph', () => {
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

    it('Deserializes marks from style attributes', () => {
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

    it('Deserializes plaintext copied from PDF', () => {
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
});

describe('editor-v4 - withRootElements', () => {
    it('Lifts up nested paragraphs', () => {
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

        const expected = ((
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
        ) as unknown) as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
