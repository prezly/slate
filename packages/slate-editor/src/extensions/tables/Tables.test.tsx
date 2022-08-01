/** @jsx jsx */
import { jest } from '@jest/globals';
import { TablesEditor } from '@prezly/slate-tables';
import { ReactEditor } from 'slate-react';

import { jsx } from '../../jsx';

describe('extensions / Tables', () => {
    beforeEach(() => {
        ReactEditor.focus = jest.fn();
    });

    it('should insert table', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as TablesEditor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text />
                </h:paragraph>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text />
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.insertTable(editor, undefined, {
            header: ['first_row'],
            border: true,
            rowsCount: 3,
            columnsCount: 3,
        });

        expect(editor.children).toEqual(expected.children);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should remove table', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>Above</h:text>
                </h:paragraph>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>Above</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.removeTable(editor);

        expect(editor.children).toEqual(expected.children);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });
});
