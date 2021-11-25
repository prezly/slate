/** @jsx jsx */

import type { Editor } from 'slate';

import jsx from '../jsx';
import { createListsEditor, lists } from '../test-utils';

describe('increaseDepth - no selected items', () => {
    it('Does nothing when there is no selection', () => {
        const editor = createListsEditor(
            <editor>
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
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('increaseDepth - single item selected', () => {
    it('Does nothing when there is no preceding sibling list item', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                lorem ipsum
                                <cursor />
                            </h-text>
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
                                lorem ipsum
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the child list of a preceding sibling list item', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                dolor sit amet
                                <cursor />
                            </h-text>
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
                            <h-text>lorem</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>ipsum</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        dolor sit amet
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Creates a child list in preceding sibling list item and moves list-item there', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                dolor sit amet
                                <cursor />
                            </h-text>
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
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        dolor sit amet
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Creates a child list in preceding sibling list item and moves list-item there, maintaining list type', () => {
        const editor = createListsEditor(
            <editor>
                <h-ol>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                dolor sit amet
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ol>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-ol>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        dolor sit amet
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ol>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('increaseDepth - multiple items selected', () => {
    it('Increases depth of all indentable list items in selection that have no list items ancestors in selection (A)', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                <anchor />
                                aaa
                            </h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>bbb</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                ccc
                                <focus />
                            </h-text>
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
                                <anchor />
                                aaa
                            </h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>bbb</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        ccc
                                        <focus />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Increases depth of all indentable list items in selection that have no list items ancestors in selection (B)', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists A</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists A1</h-text>
                                </h-li-text>
                                <h-ol>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A1a</h-text>
                                        </h-li-text>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A1b</h-text>
                                        </h-li-text>
                                    </h-li>
                                </h-ol>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        Nested
                                        <anchor /> Lists A2
                                    </h-text>
                                </h-li-text>
                                <h-ul>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A2a</h-text>
                                        </h-li-text>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A2b</h-text>
                                        </h-li-text>
                                    </h-li>
                                </h-ul>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists A3</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists B</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists B1</h-text>
                                </h-li-text>
                                <h-ul>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists B1a</h-text>
                                        </h-li-text>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>
                                                Nested Lists
                                                <focus /> B1b
                                            </h-text>
                                        </h-li-text>
                                    </h-li>
                                </h-ul>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists B2</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists C</h-text>
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
                            <h-text>Nested Lists A</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists A1</h-text>
                                </h-li-text>
                                <h-ol>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A1a</h-text>
                                        </h-li-text>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A1b</h-text>
                                        </h-li-text>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>
                                                Nested
                                                <anchor /> Lists A2
                                            </h-text>
                                        </h-li-text>
                                        <h-ul>
                                            <h-li>
                                                <h-li-text>
                                                    <h-text>Nested Lists A2a</h-text>
                                                </h-li-text>
                                            </h-li>
                                            <h-li>
                                                <h-li-text>
                                                    <h-text>Nested Lists A2b</h-text>
                                                </h-li-text>
                                            </h-li>
                                        </h-ul>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists A3</h-text>
                                        </h-li-text>
                                    </h-li>
                                </h-ol>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists B</h-text>
                                </h-li-text>
                                <h-ol>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists B1</h-text>
                                        </h-li-text>
                                        <h-ul>
                                            <h-li>
                                                <h-li-text>
                                                    <h-text>Nested Lists B1a</h-text>
                                                </h-li-text>
                                            </h-li>
                                            <h-li>
                                                <h-li-text>
                                                    <h-text>
                                                        Nested Lists
                                                        <focus /> B1b
                                                    </h-text>
                                                </h-li-text>
                                            </h-li>
                                        </h-ul>
                                    </h-li>
                                    <h-li>
                                        <h-li-text>
                                            <h-text>Nested Lists B2</h-text>
                                        </h-li-text>
                                    </h-li>
                                </h-ol>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists C</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('increaseDepth - multiple items and paragraphs selected', () => {
    it('Converts paragraphs into lists items and merges them together', () => {
        const editor = createListsEditor(
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        aaa
                    </h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>bbb</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>ccc</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>ddd</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>
                        eee
                        <focus />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                <anchor />
                                aaa
                            </h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>bbb</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>ccc</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>ddd</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                eee
                                <focus />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.increaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
