/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from './jsx';
import { createListsEditor } from './test-utils';

describe('withLists - normalizeListChildren', () => {
    it('Converts paragraph into list-item when it is a child of a list', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-p>
                        <h-text>dolor</h-text>
                    </h-p>
                </h-ul>
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
                    <h-li>
                        <h-li-text>
                            <h-text>dolor</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Wraps list in list-item when it is a child of a list', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-ul>
                        <h-li>
                            <h-li-text>
                                <h-text>lorem ipsum</h-text>
                            </h-li-text>
                        </h-li>
                    </h-ul>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('withLists - normalizeListItemChildren', () => {
    it('Lifts up list-items when they are children of list-item', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-li>
                            <h-li-text>
                                <h-text>dolor</h-text>
                            </h-li-text>
                        </h-li>
                        <h-li>
                            <h-li-text>
                                <h-text>sit</h-text>
                            </h-li-text>
                        </h-li>
                    </h-li>
                    <h-li>
                        <h-text>amet</h-text>
                    </h-li>
                </h-ul>
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
                    <h-li>
                        <h-li-text>
                            <h-text>dolor</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>sit</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>amet</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Normalizes paragraph children of list items', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-p>
                            <h-p>
                                <h-text>lorem</h-text>
                            </h-p>
                        </h-p>
                    </h-li>
                    <h-li>
                        <h-p>
                            <h-text>ipsum</h-text>
                        </h-p>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>ipsum</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Wraps extra list-item-text in list-item and lifts it up when it is a child of list-item', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-text>amet</h-text>
                    </h-li>
                </h-ul>
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
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>amet</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Wraps inline list-item children in list-item-text', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-inline-element href="https://example.com">
                            <h-text>lorem ipsum</h-text>
                        </h-inline-element>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text />
                            <h-inline-element href="https://example.com">
                                <h-text>lorem ipsum</h-text>
                            </h-inline-element>
                            <h-text />
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Wraps inline list-item children and sibling texts in list-item-text', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-text>lorem</h-text>
                        <h-inline-element href="https://example.com">
                            <h-text>ipsum</h-text>
                        </h-inline-element>
                        <h-text>dolor</h-text>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem</h-text>
                            <h-inline-element href="https://example.com">
                                <h-text>ipsum</h-text>
                            </h-inline-element>
                            <h-text>dolor</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Adds missing type attribute to block list-item children', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-element-with-no-type>
                            <h-text>lorem ipsum</h-text>
                        </h-element-with-no-type>
                    </h-li>
                </h-ul>
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
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('withLists - normalizeListItemTextChildren', () => {
    it('Unwraps block children of list-item-text elements', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-p>
                                <h-text>lorem ipsum</h-text>
                            </h-p>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-p>
                                <h-p>
                                    <h-text>dolor sit amet</h-text>
                                </h-p>
                            </h-p>
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
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit amet</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('withLists - normalizeOrphanListItem', () => {
    it('Converts orphan list-item into paragraph', () => {
        const editor = createListsEditor(
            <editor>
                <h-li>
                    <h-li-text>
                        <h-text>lorem ipsum</h-text>
                    </h-li-text>
                </h-li>
                <h-li>
                    <h-li-text>
                        <h-text>dolor sit</h-text>
                    </h-li-text>
                </h-li>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>dolor sit</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('withLists - normalizeOrphanListItemText', () => {
    it('Converts orphan list-item-text into paragraph', () => {
        const editor = createListsEditor(
            <editor>
                <h-li-text>
                    <h-text>lorem ipsum</h-text>
                </h-li-text>
                <h-li-text>
                    <h-text>dolor sit</h-text>
                </h-li-text>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>dolor sit</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('withLists - normalizeOrphanNestedList', () => {
    it('Unwraps the nested list when it does not have sibling list-item-text', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
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
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it("Moves items from nested list to previous list-item's nested list when it does not have sibling list-item-text", () => {
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
                                    <h-text>bbb</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
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
                                    <h-text>bbb</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Moves nested list to previous list item when it does not have sibling list-item-text', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('withLists - normalizeSiblingLists', () => {
    it('Merges sibling lists of same type', () => {
        const editor = createListsEditor(
            <editor>
                <h-p>
                    <h-text>lorem</h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>ipsum</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text />
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem</h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text />
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('Merges sibling lists of different types when they are nested lists', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>ipsum</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>dolor</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>ipsum</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>dolor</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
