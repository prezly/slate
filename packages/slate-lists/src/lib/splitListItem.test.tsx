/** @jsx jsx */

import type { Editor } from 'slate';

import jsx from '../jsx';
import { createListsEditor, lists } from '../test-utils';

describe('splitListItem - no selected items', () => {
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

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when there are no list items in selection', () => {
        const editor = createListsEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem
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
                <h-p>
                    <h-text>
                        lorem
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
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('splitListItem - collapsed selection', () => {
    it('Creates new empty sibling list item when cursor is at the end of an item', () => {
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
                            <h-text>
                                <cursor />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Creates new empty sibling list item when cursor is at the beginning of an item', () => {
        const editor = createListsEditor(
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
            </editor>,
        );

        const expected = (
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text />
                        </h-li-text>
                    </h-li>
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

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Creates a new sibling list item when cursor is in the middle of an item', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                lorem
                                <cursor />
                                ipsum
                            </h-text>
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
                            <h-text>lorem</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                <cursor />
                                ipsum
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('splitListItem - collapsed selection - nested lists', () => {
    it('Creates new sibling list item in nested list when cursor is at the end of an item', () => {
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
                                        lorem ipsum
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
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
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem ipsum</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Creates new sibling list item in nested list when cursor is at the beginning of an item', () => {
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
                                        <cursor />
                                        lorem ipsum
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
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
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text />
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        <cursor />
                                        lorem ipsum
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Creates new sibling list item in nested list when cursor is in the middle of an item', () => {
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
                                        lorem
                                        <cursor />
                                        ipsum
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
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
                        <h-ul>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        <cursor />
                                        ipsum
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor sit</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('splitListItem - collapsed selection - deeply nested lists', () => {
    it('Creates new sibling list item in nested list when cursor is at the end of an item with nested list', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        lorem ipsum
                                        <cursor />
                                    </h-text>
                                </h-li-text>
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
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        <cursor />
                                    </h-text>
                                </h-li-text>
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
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('splitListItem - expanded selection - deeply nested lists', () => {
    it('Removes selected text, creates new sibling list item in nested list when cursor is at the end of an item with nested list', () => {
        // it's an interesting case because Transforms.delete will break <h-li> in half,
        // leaving <h-ul> as its only child which will be normalized by withLists
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        <anchor />
                                        lorem ipsum
                                    </h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        lorem ipsum
                                        <focus />
                                    </h-text>
                                </h-li-text>
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
                                    <h-text />
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        <cursor />
                                    </h-text>
                                </h-li-text>
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
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.splitListItem(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
