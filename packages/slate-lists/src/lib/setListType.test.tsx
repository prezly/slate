/** @jsx jsx */

import { NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import type { Editor } from 'slate';

import jsx from '../jsx';
import { createListsEditor, lists } from '../test-utils';

describe('setListType - no selection', () => {
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

        lists.setListType(editor, NUMBERED_LIST_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('setListType - selection with paragraphs and lists of multiple types', () => {
    it('Changes lists types in selection', () => {
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
                                <h-ul>
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
                                    <h-text>
                                        Nested
                                        <focus /> Lists A3
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists B</h-text>
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
                            <h-text>Nested Lists A</h-text>
                        </h-li-text>
                        <h-ol>
                            <h-li>
                                <h-li-text>
                                    <h-text>Nested Lists A1</h-text>
                                </h-li-text>
                                <h-ul>
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
                                </h-ul>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        Nested
                                        <anchor /> Lists A2
                                    </h-text>
                                </h-li-text>
                                <h-ol>
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
                                </h-ol>
                            </h-li>
                            <h-li>
                                <h-li-text>
                                    <h-text>
                                        Nested
                                        <focus /> Lists A3
                                    </h-text>
                                </h-li-text>
                            </h-li>
                        </h-ol>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists B</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown as Editor;

        lists.setListType(editor, NUMBERED_LIST_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
