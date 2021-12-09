/** @jsx jsx */

import type { Editor } from 'slate';

import jsx from '../jsx';
import { createListsEditor, lists } from '../test-utils';

describe('unwrapList - no selection', () => {
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

        lists.unwrapList(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('unwrapList - selection within item', () => {
    it('Converts only list item into a paragraph', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                lorem
                                <cursor /> ipsum
                            </h-text>
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
                        <cursor /> ipsum
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        lists.unwrapList(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Converts middle list item into a paragraph', () => {
        const editor = createListsEditor(
            <editor>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                lorem
                                <cursor /> ipsum
                            </h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>sit</h-text>
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
                            <h-text>dolor</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>
                        lorem
                        <cursor /> ipsum
                    </h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>sit</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.unwrapList(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Converts nested middle list item into a paragraph', () => {
        const editor = createListsEditor(
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
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem</h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        ipsum
                                        <cursor />
                                    </h-text>
                                </h-li-text>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>dolor</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor</h-text>
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
                            <h-text>ipsum</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>lorem</h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>
                        ipsum
                        <cursor />
                    </h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>dolor</h-text>
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

        lists.unwrapList(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
