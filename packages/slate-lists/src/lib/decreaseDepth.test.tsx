/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';
import { createListsEditor, lists } from '../test-utils';

describe('decreaseDepth - no selected items', () => {
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

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('decreaseDepth - single item selected', () => {
    it('Converts list item to a paragraph when there is no grandparent list', () => {
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
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the grandparent list', () => {
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
            </editor>
        ) as unknown) as Editor;

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the grandparent list and removes the parent list if empty', () => {
        const editor = createListsEditor(
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
                    <h-li>
                        <h-li-text>
                            <h-text>
                                dolor sit amet
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the grandparent list and moves succeeding siblings into a new nested list', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>aaa</h-text>
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
                        </h-ul>
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
                                    <h-text>aaa</h-text>
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
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Converts list-item into a paragraph, moves it out of the list and moves succeeding siblings into a new list', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>aaa</h-text>
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
                                    <h-text>aaa</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>
                        dolor sit amet
                        <cursor />
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
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('decreaseDepth - multiple items selected', () => {
    it('Decreases depth of all list items in selection that have no list items ancesors in selection', () => {
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
                                </h-ol>
                            </h-li>
                        </h-ul>
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
                <h-p>
                    <h-text>Nested Lists B</h-text>
                </h-p>
                <h-ul>
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
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists C</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
