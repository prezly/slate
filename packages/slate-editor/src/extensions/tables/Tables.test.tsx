/** @jsx jsx */
import { ListsEditor, ListType } from '@prezly/slate-lists';
import { TablesEditor } from '@prezly/slate-tables';
import { noop } from '@technically/lodash';
import { fake } from 'sinon';
import { ReactEditor } from 'slate-react';

import { jsx } from '../../jsx';

describe('extensions / Tables', () => {
    beforeEach(() => {
        ReactEditor.focus = fake(noop);
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

    it('should insert row above', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
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
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.insertRowAbove(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should insert row below', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
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
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
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
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.insertRowBelow(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should remove row', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
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
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    <cursor />4
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.removeRow(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should insert column left', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
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
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
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
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.insertColumnLeft(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should insert column right', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
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
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.insertColumnRight(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should remove column', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
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
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    <cursor />2
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.removeColumn(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
        expect(ReactEditor.focus).toBeCalledTimes(1);
    });

    it('should toggle first row header type', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>Above</h:text>
                </h:paragraph>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        const expectedWithHeader = (
            <editor>
                <h:paragraph>
                    <h:text>Above</h:text>
                </h:paragraph>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        const expectedWithoutHeader = (
            <editor>
                <h:paragraph>
                    <h:text>Above</h:text>
                </h:paragraph>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        TablesEditor.toggleTableHeader(editor, undefined, 'first_row');
        expect(editor.children).toEqual(expectedWithHeader.children);

        TablesEditor.toggleTableHeader(editor, undefined, 'first_row');
        expect(editor.children).toEqual(expectedWithoutHeader.children);
    });

    it('can insert text in cell', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
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
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    1hello
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        editor.insertText('hello');

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('can insert list in cell', () => {
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
                                    1
                                    <cursor />
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor & ListsEditor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>Above</h:text>
                </h:paragraph>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:ol>
                                <h:li>
                                    <h:li-text>
                                        <h:text>
                                            1
                                            <cursor />
                                        </h:text>
                                    </h:li-text>
                                </h:li>
                            </h:ol>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as TablesEditor;

        ListsEditor.wrapInList(editor, ListType.ORDERED);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
