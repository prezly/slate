/** @jsx jsx */

import { jsx } from '../jsx';
import { createListsEditor, options } from '../test-utils';

import { getListItemsInRange } from './getListItemsInRange';

describe('getListItemsInRange', () => {
    it('Returns an empty array when there is no selection', () => {
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
                        </h-ul>
                    </h-li>
                    <h-li>
                        <h-li-text>
                            <h-text>Nested Lists C</h-text>
                        </h-li-text>
                    </h-li>
                </h-ul>
            </editor>,
        );

        const listItemsInRange = getListItemsInRange(options, editor, editor.selection);
        expect(listItemsInRange).toEqual([]);
    });

    it('Finds all partially selected list items', () => {
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

        const listItemsInRange = getListItemsInRange(options, editor, editor.selection);
        const listItemsPathsInRange = listItemsInRange.map(([, path]) => path);

        expect(listItemsPathsInRange).toEqual([
            [0, 0, 1, 1],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 0, 1, 2],
            [0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 0, 1, 0],
            [0, 1, 1, 0, 1, 1],
        ]);
    });
});
