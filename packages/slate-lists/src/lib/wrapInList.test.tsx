/** @jsx jsx */

import { BULLETED_LIST_NODE_TYPE } from '@prezly/slate-types';
import type { Editor } from 'slate';

import jsx from '../jsx';
import { createListsEditor, lists } from '../test-utils';

describe('wrapInList - no selection', () => {
    it('Does nothing when there is no selection', () => {
        const editor = createListsEditor(
            <editor>
                <h-p>
                    <h-text>aaa</h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>bbb</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>aaa</h-text>
                </h-p>
                <h-ul>
                    <h-li>
                        <h-li-text>
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>bbb</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        lists.wrapInList(editor, BULLETED_LIST_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('wrapInList - selection with wrappable nodes', () => {
    it('Converts wrappable node into list', () => {
        const editor = createListsEditor(
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        aaa
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
                                <focus />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.wrapInList(editor, BULLETED_LIST_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('wrapInList - selection with lists and wrappable nodes', () => {
    it('Converts wrappable nodes into lists items and merges them together', () => {
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
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
                <h-p>
                    <h-text>
                        bbb
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
                            <h-text>lorem ipsum</h-text>
                        </h-li-text>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>
                                bbb
                                <focus />
                            </h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>
        ) as unknown) as Editor;

        lists.wrapInList(editor, BULLETED_LIST_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('wrapInList - selection with lists, wrappable & unwrappable nodes', () => {
    it('Converts wrappable nodes into lists items and merges them together, but leaves out unwrappable nodes', () => {
        const editor = createListsEditor(
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        aaa
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>bbb</h-text>
                </h-p>
                <h-unwrappable-element>
                    <h-text>
                        ccc
                        <focus />
                    </h-text>
                </h-unwrappable-element>
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
                    </h-li>
                </h-ul>
                <h-unwrappable-element>
                    <h-text>
                        ccc
                        <focus />
                    </h-text>
                </h-unwrappable-element>
            </editor>
        ) as unknown) as Editor;

        lists.wrapInList(editor, BULLETED_LIST_NODE_TYPE);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
